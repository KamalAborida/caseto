const userService = require('../../services/user.service');

exports.createUser = async (req, res) => {
    try {
        let formObject = req.body;
        const resultObject = await userService.create(formObject);
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
}

//////////////////////////////////////////////////////////////////////////////

exports.getUser = async (req, res) => {
    try {
        let filterObject = req.query;
        const resultObject = await userService.get(filterObject, {});
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message`, err);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.listUsers = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1, limitNumber = parseInt(req.query.limit) || 10
        let filterObject = req.query;
        const resultObject = await userService.list(filterObject, {}, pageNumber, limitNumber);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const resultObject = await userService.update(id, req.body);
        return res.status(resultObject.code).json(resultObject);

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.removeUser = async (req, res) => {
    try {
        const { id } = req.query;
        const resultObject = await userService.remove(id);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            messageCode: '0007',
            error: 'Error Occurred, Please try again later.',
            code: 500,
        });
    }
}

//////////////////////////////////////////////////////////////////////////////
