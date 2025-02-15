import Joi from "joi";

const loginSchema = Joi.object({
  usernameOrEmail: Joi.alternatives()
    .try(
      Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).messages({
        "string.empty": "Username or Email is required.",
        "string.min": "Username must be at least 3 characters long.",
        "string.max": "Username must be at most 30 characters long.",
        "string.pattern.base": "Username can only contain letters, numbers, and underscores.",
      }),
      Joi.string().email({ tlds: { allow: false } }).messages({
        "string.email": "Invalid email format.",
      })
    )
    .required()
    .messages({
      "alternatives.match": "Please enter a valid username or email.",
    }),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must be at most 32 characters long.",
      "string.pattern.base": "Password must contain at least one letter and one number.",
    }),
});

export default loginSchema;
