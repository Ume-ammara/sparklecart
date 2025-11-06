import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(registerController);
authRouter.route("/verify-email/:token").post(verifyEmailController);
authRouter.route("/login").post(loginController);
authRouter.route("/refresh").get(refreshAccessTokenController);
authRouter.route("/logout").post(logoutController);

export { authRouter };
