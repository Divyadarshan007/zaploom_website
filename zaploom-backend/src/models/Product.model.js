/**
 * Product Model
 * Represents portfolio/product items with features, tech stack, and FAQs
 */

const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
}, { _id: false });

const techStackSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' },
}, { _id: false });

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
}, { _id: false });

const productSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
        title: { type: String, required: [true, 'Title is required'], trim: true },
        tagline: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
        image: { type: String, default: '' },
        alt: { type: String, trim: true, default: '' },
        features: [featureSchema],
        techStack: [techStackSchema],
        faqs: [faqSchema],
        category: { type: String, enum: ['app', 'website'], default: 'app' },
        detailLink: { type: String, trim: true, default: '' },
        androidLink: { type: String, trim: true, default: '' },
        iosLink: { type: String, trim: true, default: '' },
        isOwnProduct: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isFeatured: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

productSchema.index({ slug: 1 });
productSchema.index({ isActive: 1, order: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
