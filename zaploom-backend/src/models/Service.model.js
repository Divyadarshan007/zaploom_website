/**
 * Service Model
 * Schema for company services
 */

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String, default: '' },
        icon: { type: String, default: '' },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
