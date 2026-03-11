const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({ 'any.required': 'Email is required' }),
    password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
});

module.exports = { loginSchema };
