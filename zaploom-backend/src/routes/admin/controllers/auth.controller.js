/**
 * Auth Controller
 */

const jwt = require('jsonwebtoken');
const Admin = require('../../../models/Admin.model');
const { success, error, unauthenticated } = require('../../../utils/response');
const { comparePassword } = require('../../../utils/helpers');
const env = require('../../../config/env');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) return unauthenticated(res, 'Invalid email or password');
        if (!admin.isActive) return unauthenticated(res, 'Your account has been deactivated');
        const valid = await comparePassword(password, admin.password);
        if (!valid) return unauthenticated(res, 'Invalid email or password');
        const token = jwt.sign({ id: admin._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
        return success(res, 'Login successful', { admin: admin.toJSON(), token });
    } catch (err) {
        console.error('Login Error:', err);
        return error(res, 'Login failed. Please try again.');
    }
};

const logout = async (req, res) => {
    try {
        return success(res, 'Logout successful');
    } catch (err) {
        console.error('Logout Error:', err);
        return error(res, 'Logout failed');
    }
};

const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId);
        if (!admin) return unauthenticated(res, 'Admin not found');
        return success(res, 'Profile retrieved successfully', { admin });
    } catch (err) {
        console.error('Get Profile Error:', err);
        return error(res, 'Failed to retrieve profile');
    }
};

module.exports = { login, logout, getProfile };
