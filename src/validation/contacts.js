import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
    'any.required': 'Name is required.',
  }),

  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'string.max': 'Phone number must contain at most 20 characters.',
    'any.required': 'Phone number is required.',
  }),

  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Please provide a valid email address.',
  }),

  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite must be a boolean value.',
  }),

  contactType: Joi.string()
    .valid(...typeList)
    .default('personal')
    .required()
    .messages({
      'any.only': "Accepted values are only 'personal', 'home', or 'work'.",
      'any.required': 'Contact type is required.',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
  }),

  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number cannot be empty.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'string.max': 'Phone number must contain at most 20 characters.',
  }),

  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Please provide a valid email address.',
  }),

  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite must be a boolean value.',
  }),

  contactType: Joi.string()
    .valid(...typeList)
    .default('personal')
    .messages({
      'any.only': "Accepted values are only 'personal', 'home', or 'work'.",
    }),
});
