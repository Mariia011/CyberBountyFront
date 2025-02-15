import Joi from 'joi';

const registrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a type of string',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should be at least 3 characters long',
    'string.max': 'Username should be at most 30 characters long',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.base': 'Email should be a type of string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should be at least 6 characters long',
    'string.max': 'Password should be at most 100 characters long',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'string.base': 'Confirm Password should be a type of string',
      'any.only': 'Confirm Password must match the password',
      'any.required': 'Confirm Password is required',
    }),
});

export default registrationSchema;
