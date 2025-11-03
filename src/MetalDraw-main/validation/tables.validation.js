const joi = require("joi");

module.exports = {

    listTablesValidation: {
        query: joi.object().max(0).messages({
            'object.max': '0038|no query parameters are allowed',
        }),
    },


    //////////////////////////////////////////////////////////////////////////////

    listTableColumnsValidation: {
        query: joi.object().required().keys({
            tableName: joi.string().required().empty().messages({
                "string.base": "0039|please enter a valid table Name",
                "any.required": "0040|table Name is required",
                "string.empty": "0041|table Name can not be empty",
            }),
        }),
    },
}
