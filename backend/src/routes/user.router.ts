// user.router.ts
import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(userValidator.create),
    userController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.validateBody(userValidator.auth),
    userController.signIn,
);

router.get("/me", authMiddleware.checkAccessToken, userController.me);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    userController.refresh,
);

export const userRouter = router;
