/**
 * Admin Seeder
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin.model');

const seedAdmin = async () => {
    try {
        await connectDB();

        const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@zaploom.com' });
        if (existing) {
            console.log('⚠️  Admin already exists, skipping...');
            process.exit(0);
        }

        const admin = new Admin({
            email: process.env.ADMIN_EMAIL || 'admin@zaploom.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            name: process.env.ADMIN_NAME || 'Admin User',
            role: process.env.ADMIN_ROLE || 'super_admin',
            isActive: true,
        });

        await admin.save();
        console.log('✅ Admin seeded successfully');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Admin Seeder Error:', err);
        process.exit(1);
    }
};

seedAdmin();
