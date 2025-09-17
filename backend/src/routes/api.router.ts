import { Router } from "express";

import { recipeRouter } from "./recipe.router";
import { userRouter } from "./user.router";

const router = Router();
router.use("/auth", userRouter);
router.use("/recipes", recipeRouter);

export const apiRouter = router;
