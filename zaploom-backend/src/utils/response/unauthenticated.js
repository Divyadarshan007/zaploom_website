const unauthenticated = (res, message = 'Authentication required') => {
    return res.status(401).json({ success: false, message });
};
module.exports = unauthenticated;
