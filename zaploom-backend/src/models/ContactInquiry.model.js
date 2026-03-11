/**
 * Contact Inquiry Model
 */

const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true },
        email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
        phone: { type: String, trim: true, default: '' },
        company: { type: String, trim: true, default: '' },
        service: { type: String, trim: true, default: '' },
        budget: { type: String, trim: true, default: '' },
        message: { type: String, trim: true, default: '' },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

contactInquirySchema.index({ createdAt: -1 });
contactInquirySchema.index({ isRead: 1 });

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
