/**
 * Testimonial Controller
 */

const Testimonial = require('../../../models/Testimonial.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse } = require('../../../utils/helpers');

const createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        return success(res, 'Testimonial created successfully', { testimonial }, 201);
    } catch (err) {
        console.error('Create Testimonial Error:', err);
        return error(res, 'Failed to create testimonial');
    }
};

const getTestimonials = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search } = req.query;
        const query = {};
        if (search) query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ];
        const [testimonials, total] = await Promise.all([
            Testimonial.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
            Testimonial.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(testimonials, page, limit, total);
        return success(res, 'Testimonials retrieved successfully', { testimonials: data, ...pagination });
    } catch (err) {
        console.error('Get Testimonials Error:', err);
        return error(res, 'Failed to retrieve testimonials');
    }
};

const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return error(res, 'Testimonial not found', 404);
        return success(res, 'Testimonial retrieved successfully', { testimonial });
    } catch (err) {
        console.error('Get Testimonial Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid testimonial ID', 400);
        return error(res, 'Failed to retrieve testimonial');
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!testimonial) return error(res, 'Testimonial not found', 404);
        return success(res, 'Testimonial updated successfully', { testimonial });
    } catch (err) {
        console.error('Update Testimonial Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid testimonial ID', 400);
        return error(res, 'Failed to update testimonial');
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return error(res, 'Testimonial not found', 404);
        await Testimonial.findByIdAndDelete(req.params.id);
        return success(res, 'Testimonial deleted successfully');
    } catch (err) {
        console.error('Delete Testimonial Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid testimonial ID', 400);
        return error(res, 'Failed to delete testimonial');
    }
};

module.exports = { createTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial };
