/**
 * Common/Public Routes
 * No auth required - serves data for the frontend
 */

const express = require('express');
const router = express.Router();
const validate = require('../../utils/middleware/validation.middleware');
const { contactSchema } = require('./validators/contact.validator');
const {
    getProducts, getProductBySlug,
    getTestimonials, getTeamMembers, getFaqs,
    submitContact,
    getHomePage, getAboutPage, getContactPage, getGlobalSettings,
    getServices,
} = require('./controllers/public.controller');

// Public data endpoints
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/testimonials', getTestimonials);
router.get('/team-members', getTeamMembers);
router.get('/faqs', getFaqs);
router.get('/services', getServices);

// Contact form
router.post('/contact', validate(contactSchema), submitContact);

// Page data
router.get('/page-settings/home', getHomePage);
router.get('/page-settings/about', getAboutPage);
router.get('/page-settings/contact', getContactPage);
router.get('/page-settings/global', getGlobalSettings);

module.exports = router;
