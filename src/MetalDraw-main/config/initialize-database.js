// initialize-database.js
const sequelize = require('./database-config');
const Admin = require('../models/user.model');
const Capacity = require('../models/capacity.model');
const TypeOfSlide = require('../models/typeOfSlide.model');
const Color = require('../models/color.model');

exports.initializeDatabase = async () => {
    try {
        await Admin.sync({ alter: true });
        await Capacity.sync({ alter: true });
        await TypeOfSlide.sync({ alter: true });
        await Color.sync({ alter: true });

        console.log('Database synchronization completed successfully.');
    } catch (err) {
        console.error('Error occurred during database synchronization:', err.message);
        process.exit(1);
    } finally {
        try { await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); } catch { }
    }
};

