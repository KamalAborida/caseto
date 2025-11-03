const { Sequelize } = require('sequelize');
const Database = require('../config/database-config');

exports.listTables = async (excludeTable = []) => {
    try {
        const query = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;

        const tables = await Database.query(query, { type: Sequelize.QueryTypes.SELECT });        
        const tableNames = tables.map(row => {
            if (typeof row === 'object' && row.table_name) return row.table_name;
            if (Array.isArray(row)) return row[0];
            return row;
        });
        
        return {
            success: true,
            tables: tableNames.filter(table => !excludeTable.includes(table)),
            code: 200
        };
    } catch (err) {
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
};

//////////////////////////////////////////////////////////////////

exports.getTableColumns = async (tableName, excludeColumns = []) => {
    try {        
        const query = `
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = :tableName
            AND table_schema = 'public'
        `;

        const results = await Database.query(query, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { tableName }
        });

        const allColumns = results.map(row => row.column_name);

        return {
            success: true,
            columns: allColumns.filter(col => !excludeColumns.includes(col)),
            code: 200
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}