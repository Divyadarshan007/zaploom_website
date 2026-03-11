/**
 * Global Settings Model
 * Header, footer, and site-wide settings
 */

const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema(
    {
        header: { type: mongoose.Schema.Types.Mixed, default: {} },
        footer: { type: mongoose.Schema.Types.Mixed, default: {} },
        siteSettings: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
);

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
