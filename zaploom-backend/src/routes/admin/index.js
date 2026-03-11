/**
 * Admin Routes Index
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const testimonialRoutes = require('./testimonial.routes');
const teamMemberRoutes = require('./team-member.routes');
const faqRoutes = require('./faq.routes');
const contactInquiryRoutes = require('./contact-inquiry.routes');
const pageSettingsRoutes = require('./page-settings.routes');
const uploadRoutes = require('./upload.routes');

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/testimonial', testimonialRoutes);
router.use('/team-member', teamMemberRoutes);
router.use('/faq', faqRoutes);
router.use('/contact-inquiry', contactInquiryRoutes);
router.use('/page-settings', pageSettingsRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
