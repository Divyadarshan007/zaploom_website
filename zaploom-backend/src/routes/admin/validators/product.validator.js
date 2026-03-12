const Joi = require('joi');

const featureSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().allow('').optional(),
    icon: Joi.string().allow('').optional(),
});

const techStackSchema = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string().allow('').optional(),
});

const faqSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
});

const createProductSchema = Joi.object({
    slug: Joi.string().optional(),
    title: Joi.string().required().messages({ 'any.required': 'Title is required' }),
    tagline: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().allow('').optional(),
    alt: Joi.string().allow('').optional(),
    features: Joi.array().items(featureSchema).optional(),
    techStack: Joi.array().items(techStackSchema).optional(),
    faqs: Joi.array().items(faqSchema).optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    order: Joi.number().optional(),
});

const updateProductSchema = Joi.object({
    slug: Joi.string().optional(),
    title: Joi.string().optional(),
    tagline: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().allow('').optional(),
    alt: Joi.string().allow('').optional(),
    features: Joi.array().items(featureSchema).optional(),
    techStack: Joi.array().items(techStackSchema).optional(),
    faqs: Joi.array().items(faqSchema).optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    order: Joi.number().optional(),
}).min(1);

module.exports = { createProductSchema, updateProductSchema };
