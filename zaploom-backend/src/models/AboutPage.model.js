/**
 * About Page Model
 */

const mongoose = require('mongoose');

const aboutPageSchema = new mongoose.Schema(
    {
        sections: {
            hero: { type: mongoose.Schema.Types.Mixed, default: {} },
            mission: { type: mongoose.Schema.Types.Mixed, default: {} },
            teamTitle: { type: mongoose.Schema.Types.Mixed, default: {} },
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

module.exports = mongoose.model('AboutPage', aboutPageSchema);
