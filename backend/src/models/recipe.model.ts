import { model, Schema, SchemaDefinition } from "mongoose";

import { IRecipes } from "../interfaces/recipes.interface";

const recipeSchema = new Schema<IRecipes>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: [
            {
                type: String,
                required: true,
            },
        ],
        instruction: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        photo: {
            type: String,
            default: "",
        },
    } as SchemaDefinition<IRecipes>, // Додаємо явне приведення типу
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Recipe = model<IRecipes>("Recipe", recipeSchema);
