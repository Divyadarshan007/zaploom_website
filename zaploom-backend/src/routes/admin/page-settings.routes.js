const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { pageSettingsSchema, globalSettingsSchema } = require('./validators/page-settings.validator');
const {
    getHomePage, updateHomePage,
    getAboutPage, updateAboutPage,
    getContactPage, updateContactPage,
    getGlobalSettings, updateGlobalSettings,
} = require('./controllers/page-settings.controller');

// Home Page
router.get('/home', adminAuthGuard, getHomePage);
router.put('/home', adminAuthGuard, validate(pageSettingsSchema), updateHomePage);

// About Page
router.get('/about', adminAuthGuard, getAboutPage);
router.put('/about', adminAuthGuard, validate(pageSettingsSchema), updateAboutPage);

// Contact Page
router.get('/contact', adminAuthGuard, getContactPage);
router.put('/contact', adminAuthGuard, validate(pageSettingsSchema), updateContactPage);

// Global Settings
router.get('/global', adminAuthGuard, getGlobalSettings);
router.put('/global', adminAuthGuard, validate(globalSettingsSchema), updateGlobalSettings);

module.exports = router;
