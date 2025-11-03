const Sequelize = require('sequelize');

const Database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        pool: {
            max: 100,
            min: 5,
            acquire: 120000,
            idle: 20000
        },
        dialectOptions: {
            connectTimeout: 120000,
            ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
        }
    }
);

module.exports = Database;
