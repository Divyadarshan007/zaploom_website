const Joi = require('joi');

const pageSettingsSchema = Joi.object({
    sections: Joi.object().optional(),
    seo: Joi.object({
        title: Joi.string().allow('').optional(),
        description: Joi.string().allow('').optional(),
        keywords: Joi.array().items(Joi.string()).optional(),
        ogImage: Joi.string().allow('').optional(),
    }).optional(),
});

const globalSettingsSchema = Joi.object({
    header: Joi.object().optional(),
    footer: Joi.object().optional(),
    siteSettings: Joi.object().optional(),
});

module.exports = { pageSettingsSchema, globalSettingsSchema };
