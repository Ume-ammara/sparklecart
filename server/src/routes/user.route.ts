import { Router } from "express";
import { getUserProfileController } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/profile").get(isLoggedIn, getUserProfileController);

export { userRouter };
