/**
 * Environment Configuration Loader
 */

require('dotenv').config();

const env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/zaploom_backend',
    JWT_SECRET: process.env.JWT_SECRET || 'zaploom-jwt-secret-change-in-production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3001',
    API_BASE_PATH: process.env.API_BASE_PATH || '/api',
    BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
};

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName] && process.env.NODE_ENV === 'production') {
        console.error(`❌ Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});

module.exports = env;
