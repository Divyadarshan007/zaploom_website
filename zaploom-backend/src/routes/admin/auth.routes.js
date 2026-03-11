const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { loginSchema } = require('./validators/auth.validator');
const { login, logout, getProfile } = require('./controllers/auth.controller');

router.post('/login', validate(loginSchema), login);
router.post('/logout', adminAuthGuard, logout);
router.get('/profile', adminAuthGuard, getProfile);

module.exports = router;
