import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createCheckoutForCartController } from "../controllers/checkout.controller.js";

const checkoutRouter = Router();

checkoutRouter.route("/buy-cart").post(isLoggedIn, createCheckoutForCartController);

export { checkoutRouter };
