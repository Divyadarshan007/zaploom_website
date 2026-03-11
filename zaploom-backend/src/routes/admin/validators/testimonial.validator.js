const Joi = require('joi');

const createTestimonialSchema = Joi.object({
    name: Joi.string().required().messages({ 'any.required': 'Name is required' }),
    role: Joi.string().allow('').optional(),
    content: Joi.string().allow('').optional(),
    image: Joi.string().allow('').optional(),
    videoUrl: Joi.string().allow('').optional(),
    mediaType: Joi.string().valid('image', 'video', 'none').default('video'),
    isActive: Joi.boolean().optional(),
    showOnHomePage: Joi.boolean().optional(),
    order: Joi.number().optional(),
});

const updateTestimonialSchema = Joi.object({
    name: Joi.string().optional(),
    role: Joi.string().allow('').optional(),
    content: Joi.string().allow('').optional(),
    image: Joi.string().allow('').optional(),
    videoUrl: Joi.string().allow('').optional(),
    mediaType: Joi.string().valid('image', 'video', 'none').optional(),
    isActive: Joi.boolean().optional(),
    showOnHomePage: Joi.boolean().optional(),
    order: Joi.number().optional(),
}).min(1);

module.exports = { createTestimonialSchema, updateTestimonialSchema };
