/**
 * FAQ Controller
 */

const FAQ = require('../../../models/FAQ.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse } = require('../../../utils/helpers');

const createFaq = async (req, res) => {
    try {
        const faq = new FAQ(req.body);
        await faq.save();
        return success(res, 'FAQ created successfully', { faq }, 201);
    } catch (err) {
        console.error('Create FAQ Error:', err);
        return error(res, 'Failed to create FAQ');
    }
};

const getFaqs = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search } = req.query;
        const query = {};
        if (search) query.$or = [
            { question: { $regex: search, $options: 'i' } },
            { answer: { $regex: search, $options: 'i' } },
        ];
        const [faqs, total] = await Promise.all([
            FAQ.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
            FAQ.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(faqs, page, limit, total);
        return success(res, 'FAQs retrieved successfully', { faqs: data, ...pagination });
    } catch (err) {
        console.error('Get FAQs Error:', err);
        return error(res, 'Failed to retrieve FAQs');
    }
};

const getFaqById = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return error(res, 'FAQ not found', 404);
        return success(res, 'FAQ retrieved successfully', { faq });
    } catch (err) {
        console.error('Get FAQ Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid FAQ ID', 400);
        return error(res, 'Failed to retrieve FAQ');
    }
};

const updateFaq = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!faq) return error(res, 'FAQ not found', 404);
        return success(res, 'FAQ updated successfully', { faq });
    } catch (err) {
        console.error('Update FAQ Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid FAQ ID', 400);
        return error(res, 'Failed to update FAQ');
    }
};

const deleteFaq = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return error(res, 'FAQ not found', 404);
        await FAQ.findByIdAndDelete(req.params.id);
        return success(res, 'FAQ deleted successfully');
    } catch (err) {
        console.error('Delete FAQ Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid FAQ ID', 400);
        return error(res, 'Failed to delete FAQ');
    }
};

module.exports = { createFaq, getFaqs, getFaqById, updateFaq, deleteFaq };
