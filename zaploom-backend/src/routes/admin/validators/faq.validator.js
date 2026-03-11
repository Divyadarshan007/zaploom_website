const Joi = require('joi');

const createFaqSchema = Joi.object({
    question: Joi.string().required().messages({ 'any.required': 'Question is required' }),
    answer: Joi.string().required().messages({ 'any.required': 'Answer is required' }),
    isActive: Joi.boolean().optional(),
    order: Joi.number().optional(),
});

const updateFaqSchema = Joi.object({
    question: Joi.string().optional(),
    answer: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    order: Joi.number().optional(),
}).min(1);

module.exports = { createFaqSchema, updateFaqSchema };
