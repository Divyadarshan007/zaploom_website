/**
 * Contact Inquiry Controller
 */

const ContactInquiry = require('../../../models/ContactInquiry.model');
const { success, error } = require('../../../utils/response');
const { getPaginationParams, formatPaginationResponse } = require('../../../utils/helpers');

const getInquiries = async (req, res) => {
    try {
        const { page, limit, skip } = getPaginationParams(req.query);
        const { search, isRead } = req.query;
        const query = {};
        if (search) query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
        if (isRead !== undefined) query.isRead = isRead === 'true';
        const [inquiries, total] = await Promise.all([
            ContactInquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ContactInquiry.countDocuments(query),
        ]);
        const { data, pagination } = formatPaginationResponse(inquiries, page, limit, total);
        return success(res, 'Inquiries retrieved successfully', { inquiries: data, ...pagination });
    } catch (err) {
        console.error('Get Inquiries Error:', err);
        return error(res, 'Failed to retrieve inquiries');
    }
};

const getInquiryById = async (req, res) => {
    try {
        const inquiry = await ContactInquiry.findById(req.params.id);
        if (!inquiry) return error(res, 'Inquiry not found', 404);
        return success(res, 'Inquiry retrieved successfully', { inquiry });
    } catch (err) {
        console.error('Get Inquiry Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid inquiry ID', 400);
        return error(res, 'Failed to retrieve inquiry');
    }
};

const markAsRead = async (req, res) => {
    try {
        const inquiry = await ContactInquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!inquiry) return error(res, 'Inquiry not found', 404);
        return success(res, 'Inquiry marked as read', { inquiry });
    } catch (err) {
        console.error('Mark As Read Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid inquiry ID', 400);
        return error(res, 'Failed to update inquiry');
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await ContactInquiry.findById(req.params.id);
        if (!inquiry) return error(res, 'Inquiry not found', 404);
        await ContactInquiry.findByIdAndDelete(req.params.id);
        return success(res, 'Inquiry deleted successfully');
    } catch (err) {
        console.error('Delete Inquiry Error:', err);
        if (err.name === 'CastError') return error(res, 'Invalid inquiry ID', 400);
        return error(res, 'Failed to delete inquiry');
    }
};

module.exports = { getInquiries, getInquiryById, markAsRead, deleteInquiry };
