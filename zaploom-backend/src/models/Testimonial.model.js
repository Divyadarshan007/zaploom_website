/**
 * Testimonial Model
 * Video-based testimonials for Zaploom
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true },
        role: { type: String, trim: true, default: '' },
        content: { type: String, trim: true, default: '' },
        image: { type: String, default: '' },
        videoUrl: { type: String, default: '' },
        mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'video' },
        isActive: { type: Boolean, default: true },
        showOnHomePage: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

testimonialSchema.index({ createdAt: -1 });
testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
