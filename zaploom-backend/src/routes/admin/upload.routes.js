const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const { uploadImage: uploadMiddleware } = require('../../utils/middleware/upload.middleware');
const { uploadImage } = require('./controllers/upload.controller');

router.post('/image', adminAuthGuard, uploadMiddleware.single('image'), uploadImage);

module.exports = router;
