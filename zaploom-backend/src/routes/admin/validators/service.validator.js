const Joi = require('joi');

const createServiceSchema = Joi.object({
    title: Joi.string().required().messages({ 'any.required': 'Title is required' }),
    description: Joi.string().required().messages({ 'any.required': 'Description is required' }),
    image: Joi.string().allow('').optional(),
    icon: Joi.string().allow('').optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    order: Joi.number().optional(),
});

const updateServiceSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().allow('').optional(),
    icon: Joi.string().allow('').optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    order: Joi.number().optional(),
}).min(1);

module.exports = { createServiceSchema, updateServiceSchema };
