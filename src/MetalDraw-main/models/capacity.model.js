const Sequelize = require('sequelize');
const Database = require('../config/database-config');

const Capacity = Database.define('capacities', {
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

    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },


}, {
    modelName: 'capacities',
    paranoid: true,
    indexes: [
        {
            fields: ['name'],
        }
    ],
});


module.exports = Capacity;