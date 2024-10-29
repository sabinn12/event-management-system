// validation/adminSchema.ts
import Joi from 'joi';

// Validation schema for admin signup
export const adminSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username should be a type of text',
    'string.empty': 'Username cannot be empty',
    'string.alphanum': 'Username must contain only alphanumeric characters',
    'string.min': 'Username should have a minimum length of 3',
    'string.max': 'Username should have a maximum length of 30',
    'any.required': 'Username is required'
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+=-]{6,30}$'))
    .min(6)
    .required()
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have a minimum length of 6',
      'string.pattern.base': 'Password can contain letters, numbers, and special symbols like !@#$%^&*()_+=-',
      'any.required': 'Password is required'
    }),
});

// Validation schema for admin login
export const adminLoginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required'
  }),
});
