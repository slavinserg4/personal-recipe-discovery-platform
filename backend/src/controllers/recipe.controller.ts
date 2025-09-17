import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { recipeServices } from "../services/recipe.service";

class RecipeController {
    public async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;
            const recipe = await recipeServices.create({
                ...req.body,
                author: userId,
            });
            return res.status(StatusCodesEnum.CREATED).json(recipe);
        } catch (e) {
            next(e);
        }
    }

    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const recipes = await recipeServices.getAll();
            return res.json(recipes).status(StatusCodesEnum.OK);
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const recipe = await recipeServices.getById(req.params.id);
            return res.json(recipe);
        } catch (e) {
            next(e);
        }
    }

    public async search(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { query } = req.query;
            const recipes = await recipeServices.search(query as string);
            return res.json(recipes);
        } catch (e) {
            next(e);
        }
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;
            const body = req.body as Partial<IUser>;
            const updatedRecipe = await recipeServices.update(id, userId, body);
            return res.json(updatedRecipe);
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;
            await recipeServices.delete(id, userId);
            return res.sendStatus(StatusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

    public async getByAuthor(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { authorId } = req.params;
            const recipes = await recipeServices.getByAuthor(authorId);
            return res.json(recipes);
        } catch (e) {
            next(e);
        }
    }

    public async updateRating(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { rating } = req.body;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;
            const updatedRecipe = await recipeServices.updateRating(
                id,
                userId,
                rating,
            );
            return res.json(updatedRecipe);
        } catch (e) {
            next(e);
        }
    }

    public async addPhoto(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;

            if (!req.file) {
                throw new ApiError(
                    "Файл не знайдено",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            const photoUrl = `/media/${req.file.filename}`; // Використовуємо /media/ бо в main.ts прописано app.use("/media"...)

            const updatedRecipe = await recipeServices.addPhoto(
                id,
                userId,
                photoUrl,
            );
            return res.json(updatedRecipe);
        } catch (e) {
            next(e);
        }
    }
}

export const recipeController = new RecipeController();
