import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  addToCartController,
  clearCartController,
  getAllCartItemsController,
  removeFromCartController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.route("/").get(isLoggedIn, getAllCartItemsController);
cartRouter.route("/").post(isLoggedIn, addToCartController);
cartRouter.route("/").delete(isLoggedIn, removeFromCartController);
cartRouter.route("/clear").delete(isLoggedIn, clearCartController);

export { cartRouter };
