const tableDatabaseService = require('../../services/tableDatabase.service');

exports.listTables = async (req, res) => {
    try {
        const resultObject = await tableDatabaseService.listTables(['users']);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
};

exports.listTableColumns = async (req, res) => {
    try {
        const { tableName } = req.query;
        const resultObject = await tableDatabaseService.getTableColumns(tableName, ['createdAt', 'updatedAt', 'deletedAt']);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
};
