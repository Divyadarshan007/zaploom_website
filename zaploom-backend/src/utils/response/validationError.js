const validationError = (res, message = 'Validation failed', errors = {}) => {
    return res.status(422).json({ success: false, message, errors });
};
module.exports = validationError;
