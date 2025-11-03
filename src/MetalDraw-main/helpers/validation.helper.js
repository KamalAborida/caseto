module.exports = (schema) => {
    return (req, res, next) => {
        try {
            const validate = (target, data) => {
                if (!schema[target]) return null;

                const { error } = schema[target].validate(data);
                if (!error) return null;

                const [messageCode = '0007', message = error.details[0].message] = error.details[0].message.split("|");

                return {
                    success: false,
                    error: message.trim(),
                    messageCode: messageCode.trim(),
                    code: 400
                };
            };

            const bodyValidation = validate('body', req.body);
            if (bodyValidation) return res.status(400).json(bodyValidation);

            const queryValidation = validate('query', req.query);
            if (queryValidation) return res.status(400).json(queryValidation);

            return next();
        } catch (err) {
            console.error(`Validation middleware error:`, err);
            return res.status(400).json({
                success: false,
                messageCode: '0000',
                error: "Bad Request.",
                code: 400
            });
        }
    };
};
