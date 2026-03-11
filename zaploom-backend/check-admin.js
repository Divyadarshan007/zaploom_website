const mongoose = require('mongoose');
const env = require('./src/config/env');
const Admin = require('./src/models/Admin.model');

async function checkAdmin() {
    try {
        await mongoose.connect(env.MONGODB_URI);
        const admin = await Admin.findOne({ email: 'admin@zaploom.com' });
        if (admin) {
            console.log('ADMIN_EXISTS: true');
            console.log('EMAIL:', admin.email);
            console.log('IS_ACTIVE:', admin.isActive);
        } else {
            console.log('ADMIN_EXISTS: false');
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
}

checkAdmin();
