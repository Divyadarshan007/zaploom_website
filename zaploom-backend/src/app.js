/**
 * Express Application Setup
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const env = require('./config/env');
const routes = require('./routes');

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
        crossOriginEmbedderPolicy: false,
    })
);

const allowedOrigins =
    typeof env.CORS_ORIGIN === 'string'
        ? env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
        : [env.CORS_ORIGIN].filter(Boolean);

const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    if (allowedOrigins.includes(origin)) return true;
    if (env.NODE_ENV === 'development' && /^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
    return false;
};

app.use(
    cors({
        origin: (origin, callback) => {
            if (isAllowedOrigin(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(env.API_BASE_PATH, routes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Zaploom Backend API',
        version: '1.0.0',
    });
});

const uploadsImagesDir = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(uploadsImagesDir)) fs.mkdirSync(uploadsImagesDir, { recursive: true });

const corsForStatic = (req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
};

app.use('/uploads', corsForStatic, express.static(path.join(__dirname, '..', 'uploads')));
app.use('/uploads/images', corsForStatic, express.static(path.join(__dirname, '..', 'uploads', 'images')));
app.use('/images', corsForStatic, express.static(path.join(__dirname, '..', '..', 'public', 'images')));

app.use((req, res) => {
    if (req.path.startsWith(env.API_BASE_PATH)) {
        return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds limit' });
    }
    if (err.name === 'ValidationError') {
        const errors = {};
        Object.keys(err.errors).forEach((k) => {
            errors[k] = err.errors[k].message;
        });
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

module.exports = app;
