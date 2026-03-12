const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { createServiceSchema, updateServiceSchema } = require('./validators/service.validator');
const { createService, getServices, getServiceById, updateService, deleteService } = require('./controllers/service.controller');

router.post('/', adminAuthGuard, validate(createServiceSchema), createService);
router.get('/', adminAuthGuard, getServices);
router.get('/:id', adminAuthGuard, getServiceById);
router.put('/:id', adminAuthGuard, validate(updateServiceSchema), updateService);
router.delete('/:id', adminAuthGuard, deleteService);

module.exports = router;
