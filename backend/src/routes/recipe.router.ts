// recipe.router.ts
import { Router } from "express";

import { upload } from "../config/multer.config";
import { recipeController } from "../controllers/recipe.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { recipeValidator } from "../validators/recipe.validator";

const router = Router();

router.get("/", recipeController.getAll);

router.get(
    "/search",
    commonMiddleware.query(recipeValidator.search),
    recipeController.search,
);

router.get(
    "/author/:authorId",
    commonMiddleware.isIdValidate("authorId"),
    recipeController.getByAuthor,
);

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    recipeController.getById,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(recipeValidator.create),
    recipeController.create,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(recipeValidator.update),
    recipeController.update,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    recipeController.delete,
);

router.post(
    "/:id/rating",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(recipeValidator.rating),
    recipeController.updateRating,
);

router.post(
    "/:id/photo",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    upload.single("photo"), // Замість validateBody використовуємо upload.single
    recipeController.addPhoto,
);

export const recipeRouter = router;
