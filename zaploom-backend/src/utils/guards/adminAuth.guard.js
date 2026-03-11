/**
 * Admin Auth Guard - JWT verification for admin routes
 */

const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { unauthenticated, error } = require('../response');
const Admin = require('../../models/Admin.model');

const adminAuthGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return unauthenticated(res, 'No token provided. Please login.');
        }
        const token = authHeader.substring(7);
        let decoded;
        try {
            decoded = jwt.verify(token, env.JWT_SECRET);
        } catch (err) {
            return unauthenticated(res, 'Invalid or expired token. Please login again.');
        }
        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return unauthenticated(res, 'Admin not found.');
        }
        req.admin = admin;
        req.adminId = admin._id;
        next();
    } catch (err) {
        console.error('Admin Auth Guard Error:', err);
        return error(res, 'Authentication failed', 500);
    }
};

module.exports = adminAuthGuard;
