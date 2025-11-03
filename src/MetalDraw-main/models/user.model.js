const Sequelize = require('sequelize');
const Database = require('../config/database-config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { userRoleAppEnum } = require('../enums/userRoleApp.enum');

const User = Database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        set(fullName) {
            this.setDataValue('fullName', fullName ? fullName.trim() : null);
        }
    },

    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        set(emailAddress) {
            this.setDataValue('emailAddress', emailAddress ? emailAddress.trim() : null);
        }
    },

    isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    roleApp: {
        type: Sequelize.ENUM,
        values: Object.values(userRoleAppEnum),
    },

    salt: {
        type: Sequelize.STRING,
        allowNull: false,
        set(salt) {
            this.setDataValue('salt', crypto.randomBytes(16).toString('hex'));
        }
    },

    hash: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        set(password) {
            console.log(crypto.randomBytes(16).toString('hex'))
            let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
            this.setDataValue('hash', hash);
        }
    },

    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },



}, {
    modelName: 'users',
    paranoid: true,
    indexes: [
        {
            fields: ['fullName'],
        },
        {
            fields: ['isActive'],
        },
        {
            fields: ['emailAddress'],
        }
    ],
});


User.prototype.validatePassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
};

User.prototype.generateJWT = async function () {

    const EXPIRE_TIME = parseInt(process.env.API_TOKEN_EXPIRY_TIME);
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + EXPIRE_TIME / (60 * 60 * 24));

    return jwt.sign({
        id: this.id,
        fullName: this.fullName,
        emailAddress: this.emailAddress,
        roleApp: this.roleApp,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);

};


User.prototype.toAuthJSON = async function () {
    return {
        token: await this.generateJWT(),
    }
};


module.exports = User;