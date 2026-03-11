/**
 * Validation Middleware - Joi request body validation
 */

const { validationError } = require('../response');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const errors = {};
            error.details.forEach((d) => {
                errors[d.path.join('.')] = d.message;
            });
            return validationError(res, 'Validation failed', errors);
        }
        next();
    };
};

module.exports = validate;
