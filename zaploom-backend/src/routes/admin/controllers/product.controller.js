/**
 * Product Controller
 */

const Product = require('../../../models/Product.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse, generateSlug } = require('../../../utils/helpers');

const createProduct = async (req, res) => {
    try {
        if (!req.body.slug && req.body.title) {
            req.body.slug = generateSlug(req.body.title);
        }
        const existing = await Product.findOne({ slug: req.body.slug });
        if (existing) {
            req.body.slug = `${req.body.slug}-${Date.now()}`;
        }
        const product = new Product(req.body);
        await product.save();
        return success(res, 'Product created successfully', { product }, 201);
    } catch (err) {
        console.error('Create Product Error:', err);
        return error(res, 'Failed to create product');
    }
};

const getProducts = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search } = req.query;
        const query = {};
        if (search) query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tagline: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
        const [products, total] = await Promise.all([
            Product.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
            Product.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(products, page, limit, total);
        return success(res, 'Products retrieved successfully', { products: data, ...pagination });
    } catch (err) {
        console.error('Get Products Error:', err);
        return error(res, 'Failed to retrieve products');
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return error(res, 'Product not found', 404);
        return success(res, 'Product retrieved successfully', { product });
    } catch (err) {
        console.error('Get Product Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid product ID', 400);
        return error(res, 'Failed to retrieve product');
    }
};

const updateProduct = async (req, res) => {
    try {
        if (req.body.title && !req.body.slug) {
            req.body.slug = generateSlug(req.body.title);
            const existing = await Product.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
            if (existing) {
                req.body.slug = `${req.body.slug}-${Date.now()}`;
            }
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return error(res, 'Product not found', 404);
        return success(res, 'Product updated successfully', { product });
    } catch (err) {
        console.error('Update Product Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid product ID', 400);
        return error(res, 'Failed to update product');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return error(res, 'Product not found', 404);
        await Product.findByIdAndDelete(req.params.id);
        return success(res, 'Product deleted successfully');
    } catch (err) {
        console.error('Delete Product Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid product ID', 400);
        return error(res, 'Failed to delete product');
    }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
