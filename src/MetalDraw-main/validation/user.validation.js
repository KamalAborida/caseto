const joi = require("joi");
const { userRoleAppEnum } = require('../enums/userRoleApp.enum');

module.exports = {
    createUserValidation: {
        body: joi.object().required().keys({
            fullName: joi.string().required().empty().messages({
                "string.base": "0013|please enter a valid full Name",
                "any.required": "0014|full Name is required",
                "string.empty": "0015|full Name can not be empty",
            }),
            emailAddress: joi.string().required().empty().messages({
                "string.base": "0016|please enter a valid email Address",
                "any.required": "0017|email Address is required",
                "string.empty": "0018|email Address can not be empty",
            }),
            password: joi.string().required().empty().messages({
                "string.base": "0019|please enter a valid password",
                "any.required": "0020|password is required",
                "string.empty": "0021|password can not be empty",
            }),
            confirmPassword: joi.string().required().empty().messages({
                "string.base": "0019|please enter a valid password",
                "any.required": "0020|password is required",
                "string.empty": "0021|password can not be empty",
            }),

            roleApp: joi.string().required().valid(...Object.values(userRoleAppEnum)).messages({
                "string.base": "0023|please enter a valid role App",
                "any.required": "0037|role App is required",
                "any.only": "0024|role App must be one of the following values: superAdmin, editor, viewer",
            }),

        }),
    },

    //////////////////////////////////////////////////////////////////////////////

    updateUserValidation: {
        body: joi.object().required().keys({
            isActive: joi.boolean().optional().messages({
                "boolean.base": "0022|please enter a valid boolean value",
            }),
            fullName: joi.string().optional().empty().messages({
                "string.base": "0013|please enter a valid full Name",
                "string.empty": "0015|full Name can not be empty",
            }),
            roleApp: joi.string().optional().valid(...Object.values(userRoleAppEnum)).messages({
                "string.base": "0023|please enter a valid role App",
                "any.only": "0024|role App must be one of the following values: superAdmin, editor, viewer",
            }),
        }),
        query: joi.object().required().keys({
            id: joi.number().integer().required().messages({
                "number.base": "0025|please enter a valid id",
                "number.integer": "0026|id must be an integer",
                "any.required": "0027|id is required"
            }),
        }),
    },

    //////////////////////////////////////////////////////////////////////////////

    removeUserValidation: {
        query: joi.object().required().keys({
            id: joi.number().integer().required().messages({
                "number.base": "0025|please enter a valid id",
                "number.integer": "0026|id must be an integer",
                "any.required": "0027|id is required"
            }),
        }),
    },

    //////////////////////////////////////////////////////////////////////////////

    getUserValidation: {
        query: joi.object().required().keys({
            id: joi.number().integer().required().messages({
                "number.base": "0025|please enter a valid id",
                "number.integer": "0026|id must be an integer",
                "any.required": "0027|id is required"
            }),
        }),
    },

    //////////////////////////////////////////////////////////////////////////////

    listUsersValidation: {
        query: joi.object().optional().keys({
            page: joi.number().integer().optional().min(1).messages({
                "number.base": "0028|page must be a number",
                "number.integer": "0029|page must be an integer",
                "number.min": "0030|page must be greater than or equal to 1",
            }),

            limit: joi.number().integer().optional().min(1).messages({
                "number.base": "0031|limit must be a number",
                "number.integer": "0032|limit must be an integer",
                "number.min": "0033|limit must be greater than or equal to 1",
            }),
        }),
    },
}
