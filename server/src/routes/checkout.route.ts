import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  createCheckoutForBuyNowController,
  createCheckoutForCartController,
} from "../controllers/checkout.controller.js";

const checkoutRouter = Router();

checkoutRouter.route("/buy-cart").post(isLoggedIn, createCheckoutForCartController);
checkoutRouter.route("/buy-now").post(isLoggedIn, createCheckoutForBuyNowController);

export { checkoutRouter };
