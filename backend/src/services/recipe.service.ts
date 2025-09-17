import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IRecipes, IRecipesCreateDTO } from "../interfaces/recipes.interface";
import { recipeRepository } from "../repositiry/recipe.repository";

class RecipeService {
    public async create(data: IRecipesCreateDTO): Promise<IRecipes> {
        return await recipeRepository.create(data);
    }

    // Додайте логування в сервіс
    public async getAll(): Promise<IRecipes[]> {
        try {
            const recipes = await recipeRepository.getAll();
            console.log("Отримані рецепти:", recipes);
            return recipes;
        } catch (error) {
            console.error("Помилка при отриманні рецептів:", error);
            throw new ApiError(
                "Помилка при отриманні рецептів",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }

    public async search(searchTerm: string): Promise<IRecipes[]> {
        return await recipeRepository.search(searchTerm);
    }

    public async getById(id: string): Promise<IRecipes> {
        const recipe = await recipeRepository.findById(id);

        if (!recipe) {
            throw new ApiError("Рецепт не знайдено", StatusCodesEnum.NOT_FOUND);
        }

        return recipe;
    }

    public async update(
        id: string,
        userId: string,
        data: Partial<IRecipes>,
    ): Promise<IRecipes> {
        const recipe = await this.getById(id);

        if (recipe.author.toString() !== userId) {
            throw new ApiError(
                "Немає прав для редагування цього рецепту",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        return await recipeRepository.update(id, data);
    }

    public async delete(id: string, userId: string): Promise<void> {
        const recipe = await this.getById(id);

        if (recipe.author.toString() !== userId) {
            throw new ApiError(
                "Немає прав для видалення цього рецепту",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        await recipeRepository.delete(id);
    }

    public async getByAuthor(authorId: string): Promise<IRecipes[]> {
        return await recipeRepository.findByAuthor(authorId);
    }

    public async updateRating(
        id: string,
        userId: string,
        rating: number,
    ): Promise<IRecipes> {
        const recipe = await this.getById(id);

        if (recipe.author.toString() === userId) {
            throw new ApiError(
                "Не можна оцінювати власний рецепт",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        return await recipeRepository.updateRating(id, rating);
    }

    public async addPhoto(
        id: string,
        userId: string,
        photoUrl: string,
    ): Promise<IRecipes> {
        const recipe = await this.getById(id);

        if (recipe.author.toString() !== userId) {
            throw new ApiError(
                "Немає прав для додавання фото до цього рецепту",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        if (!photoUrl) {
            throw new ApiError(
                "URL фото є обов'язковим",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await recipeRepository.addPhoto(id, photoUrl);
    }
}

export const recipeServices = new RecipeService();
