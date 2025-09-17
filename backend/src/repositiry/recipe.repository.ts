import { FilterQuery } from "mongoose";

import { IRecipes, IRecipesCreateDTO } from "../interfaces/recipes.interface";
import { Recipe } from "../models/recipe.model";

class RecipeRepository {
    public create(data: Partial<IRecipesCreateDTO>): Promise<IRecipes> {
        return Recipe.create(data);
    }

    public getAll(query: FilterQuery<IRecipes> = {}): Promise<IRecipes[]> {
        return Recipe.find(query).populate("author", ["name", "email"]);
    }

    public search(searchTerm: string): Promise<IRecipes[]> {
        return Recipe.find({
            $or: [{ title: { $regex: searchTerm, $options: "i" } }],
        }).populate("author", ["name", "email"]);
    }

    public findById(id: string): Promise<IRecipes> {
        return Recipe.findById(id);
    }

    public update(id: string, data: Partial<IRecipes>): Promise<IRecipes> {
        return Recipe.findByIdAndUpdate(
            id,
            { ...data, updatedAt: new Date() },
            { new: true },
        );
    }

    public delete(id: string): Promise<void> {
        return Recipe.findByIdAndDelete(id);
    }

    public findByAuthor(authorId: string): Promise<IRecipes[]> {
        return this.getAll({ author: authorId });
    }

    public updateRating(id: string, rating: number): Promise<IRecipes> {
        return Recipe.findByIdAndUpdate(id, { rating }, { new: true });
    }

    public addPhoto(id: string, photoUrl: string): Promise<IRecipes> {
        return Recipe.findByIdAndUpdate(id, { photo: photoUrl }, { new: true });
    }
}

export const recipeRepository = new RecipeRepository();
