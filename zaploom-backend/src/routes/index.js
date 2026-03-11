/**
 * Routes Index
 * Main router that aggregates all route modules
 */

const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin');
const commonRoutes = require('./common');

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

router.use('/admin', adminRoutes);
router.use('/common', commonRoutes);

router.use((req, res) => {
    if (res.headersSent) return;
    res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = router;
