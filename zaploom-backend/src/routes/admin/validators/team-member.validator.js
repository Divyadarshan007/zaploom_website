const Joi = require('joi');

const createTeamMemberSchema = Joi.object({
    name: Joi.string().required().messages({ 'any.required': 'Name is required' }),
    role: Joi.string().required().messages({ 'any.required': 'Role is required' }),
    image: Joi.string().allow('').optional(),
    bio: Joi.string().allow('').optional(),
    isActive: Joi.boolean().optional(),
    order: Joi.number().optional(),
});

const updateTeamMemberSchema = Joi.object({
    name: Joi.string().optional(),
    role: Joi.string().optional(),
    image: Joi.string().allow('').optional(),
    bio: Joi.string().allow('').optional(),
    isActive: Joi.boolean().optional(),
    order: Joi.number().optional(),
}).min(1);

module.exports = { createTeamMemberSchema, updateTeamMemberSchema };
