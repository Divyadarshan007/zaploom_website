const express = require('express');
const router = express.Router();
const adminAuthGuard = require('../../utils/guards/adminAuth.guard');
const validate = require('../../utils/middleware/validation.middleware');
const { createProductSchema, updateProductSchema } = require('./validators/product.validator');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('./controllers/product.controller');

router.post('/', adminAuthGuard, validate(createProductSchema), createProduct);
router.get('/', adminAuthGuard, getProducts);
router.get('/:id', adminAuthGuard, getProductById);
router.put('/:id', adminAuthGuard, validate(updateProductSchema), updateProduct);
router.delete('/:id', adminAuthGuard, deleteProduct);

module.exports = router;
