/**
 * FAQ Model
 */

const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
    {
        question: { type: String, required: [true, 'Question is required'], trim: true },
        answer: { type: String, required: [true, 'Answer is required'], trim: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

faqSchema.index({ isActive: 1, order: 1 });
faqSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FAQ', faqSchema);
