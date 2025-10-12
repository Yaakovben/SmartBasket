import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "אנא הזן שם משתמש",
      "string.min": "שם המשתמש חייב להכיל לפחות 3 תווים",
      "string.max": "שם המשתמש לא יכול להכיל יותר מ-30 תווים",
      "any.required": "שם המשתמש הוא שדה חובה",
    }),

  password: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "אנא הזן סיסמה",
      "string.min": "הסיסמה חייבת להכיל לפחות 3 תווים",
      "string.max": "הסיסמה לא יכולה להכיל יותר מ-50 תווים",
      "any.required": "הסיסמה היא שדה חובה",
    }),
});
