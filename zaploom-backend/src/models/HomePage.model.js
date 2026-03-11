/**
 * Home Page Model
 * Schema for home page content sections
 */

const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema(
    {
        sections: {
            hero: { type: mongoose.Schema.Types.Mixed, default: {} },
            features: { type: mongoose.Schema.Types.Mixed, default: {} },
            portfolio: { type: mongoose.Schema.Types.Mixed, default: {} },
            trustedLogos: { type: mongoose.Schema.Types.Mixed, default: [] },
        },
        seo: {
            title: { type: String, trim: true },
            description: { type: String, trim: true },
            keywords: [{ type: String, trim: true }],
            ogImage: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HomePage', homePageSchema);
