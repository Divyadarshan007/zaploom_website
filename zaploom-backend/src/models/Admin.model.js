/**
 * Admin Model
 */

const mongoose = require('mongoose');
const { hashPassword } = require('../utils/helpers');

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        name: { type: String, required: [true, 'Name is required'], trim: true },
        role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (e) {
        next(e);
    }
});

adminSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('Admin', adminSchema);
