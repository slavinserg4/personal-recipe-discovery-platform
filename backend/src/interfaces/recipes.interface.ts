import { Types } from "mongoose";

import { IBase } from "./base.interface";

export interface IRecipes extends IBase {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    instruction: string;
    author: Types.ObjectId;
    rating: number;
    photo?: string;
}
export type IRecipesCreateDTO = Pick<
    IRecipes,
    "title" | "description" | "ingredients" | "instruction" | "author" | "photo"
>;
