/**
 * MongoDB Database Connection
 */

const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const conn = await mongoose.connect(env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,
                maxPoolSize: 10,
                minPoolSize: 2,
                maxIdleTimeMS: 30000,
            });
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            console.log(`📊 Database: ${conn.connection.name}`);
            return conn;
        } catch (error) {
            console.error(`❌ MongoDB Connection Error (Attempt ${i + 1}/${retries}): ${error.message}`);
            if (i === retries - 1) {
                console.error('❌ Failed to connect to MongoDB after all retries. Exiting...');
                process.exit(1);
            }
            console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB Error: ${err.message}`);
});

module.exports = connectDB;
