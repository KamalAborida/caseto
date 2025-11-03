const Sequelize = require('sequelize');
const Database = require('../config/database-config');

const Color = Database.define('colors', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(name) {
            this.setDataValue('name', name ? name.trim() : null);
        }
    },

    hexCode: {
        type: Sequelize.STRING,
        allowNull: false,
        set(hexCode) {
            this.setDataValue('hexCode', hexCode ? hexCode.trim() : null);
        }
    },


    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },


}, {
    modelName: 'colors',
    paranoid: true,
    indexes: [
        {
            fields: ['name'],
        },
        {
            fields: ['hexCode'],
        }
    ],
});


module.exports = Color;