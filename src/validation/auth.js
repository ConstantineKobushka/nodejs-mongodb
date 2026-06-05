import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
    'any.required': 'Name is required.',
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern': 'Please provide a valid email address.',
    'any.required': 'Name is required.',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'any.required': 'Phone number is required.',
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern': 'Please provide a valid email address.',
    'any.required': 'Name is required.',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'any.required': 'Phone number is required.',
  }),
});
