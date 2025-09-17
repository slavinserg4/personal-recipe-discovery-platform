// validators/recipe.validator.ts
import Joi from "joi";

export const recipeValidator = {
    create: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .pattern(/^[A-ZА-ЯІЇЄ]/)
            .required()
            .messages({
                "string.pattern.base": "Назва має починатися з великої літери",
            }),
        description: Joi.string().min(10).max(5000).required(),
        ingredients: Joi.array()
            .items(Joi.string().min(2).max(100))
            .min(1)
            .required(),
        instruction: Joi.string().min(20).max(5000).required(),
        photo: Joi.string().uri().optional(),
    }),

    update: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .pattern(/^[A-ZА-ЯІЇЄ]/)
            .messages({
                "string.pattern.base": "Назва має починатися з великої літери",
            }),
        description: Joi.string().min(10).max(5000),
        ingredients: Joi.array().items(Joi.string().min(2).max(100)).min(1),
        instruction: Joi.string().min(20).max(5000),
        photo: Joi.string().uri(),
    }),

    rating: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
    }),

    search: Joi.object({
        query: Joi.string().min(2).max(50).required(),
    }),

    photo: Joi.object({
        photoUrl: Joi.string().uri().required(),
    }),
};
