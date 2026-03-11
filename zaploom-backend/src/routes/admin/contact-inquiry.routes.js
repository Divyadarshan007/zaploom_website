const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const { getInquiries, getInquiryById, markAsRead, deleteInquiry } = require('./controllers/contact-inquiry.controller');

router.get('/', adminAuthGuard, getInquiries);
router.get('/:id', adminAuthGuard, getInquiryById);
router.put('/:id/read', adminAuthGuard, markAsRead);
router.delete('/:id', adminAuthGuard, deleteInquiry);

module.exports = router;
