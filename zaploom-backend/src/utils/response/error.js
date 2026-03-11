const error = (res, message = 'Internal server error', statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};
module.exports = error;
