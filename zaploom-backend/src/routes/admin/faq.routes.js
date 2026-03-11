const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { createFaqSchema, updateFaqSchema } = require('./validators/faq.validator');
const { createFaq, getFaqs, getFaqById, updateFaq, deleteFaq } = require('./controllers/faq.controller');

router.post('/', adminAuthGuard, validate(createFaqSchema), createFaq);
router.get('/', adminAuthGuard, getFaqs);
router.get('/:id', adminAuthGuard, getFaqById);
router.put('/:id', adminAuthGuard, validate(updateFaqSchema), updateFaq);
router.delete('/:id', adminAuthGuard, deleteFaq);

module.exports = router;
