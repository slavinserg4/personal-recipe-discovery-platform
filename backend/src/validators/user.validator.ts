import Joi from "joi";

export const userValidator = {
    create: Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(6).max(20).trim().required(),
        name: Joi.string()
            .min(2)
            .max(50)
            .pattern(/^[A-ZА-ЯІЇЄ][a-zа-яіїє'-]+$/)
            .required()
            .messages({
                "string.pattern.base": "Ім'я має починатися з великої літери",
            }),
    }),

    auth: Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(6).max(20).trim().required(),
    }),
};
