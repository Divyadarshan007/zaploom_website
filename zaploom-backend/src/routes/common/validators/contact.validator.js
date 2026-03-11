const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required().messages({ 'any.required': 'Name is required' }),
    email: Joi.string().email().required().messages({ 'any.required': 'Email is required' }),
    phone: Joi.string().allow('').optional(),
    company: Joi.string().allow('').optional(),
    service: Joi.string().allow('').optional(),
    budget: Joi.string().allow('').optional(),
    message: Joi.string().allow('').optional(),
});

module.exports = { contactSchema };
