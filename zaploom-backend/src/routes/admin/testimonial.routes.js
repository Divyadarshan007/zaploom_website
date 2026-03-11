const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { createTestimonialSchema, updateTestimonialSchema } = require('./validators/testimonial.validator');
const { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require('./controllers/testimonial.controller');

router.post('/', adminAuthGuard, validate(createTestimonialSchema), createTestimonial);
router.get('/', adminAuthGuard, getTestimonials);
router.get('/:id', adminAuthGuard, getTestimonialById);
router.put('/:id', adminAuthGuard, validate(updateTestimonialSchema), updateTestimonial);
router.delete('/:id', adminAuthGuard, deleteTestimonial);

module.exports = router;
