/**
 * Contact Page Model
 */

const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema(
    {
        sections: {
            hero: { type: mongoose.Schema.Types.Mixed, default: {} },
            contactInfo: { type: mongoose.Schema.Types.Mixed, default: {} },
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

module.exports = mongoose.model('ContactPage', contactPageSchema);
