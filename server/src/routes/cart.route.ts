import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  addToCartController,
  clearCartController,
  getAllCartItemsController,
  removeFromCartController,
  updateCartQuantityController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.route("/").get(isLoggedIn, getAllCartItemsController);
cartRouter.route("/").post(isLoggedIn, addToCartController);
cartRouter.route("/clear").delete(isLoggedIn, clearCartController);
cartRouter.route("/:cartItemId").delete(isLoggedIn, removeFromCartController);
cartRouter.route("/:cartItemId/quantity").patch(isLoggedIn, updateCartQuantityController);

export { cartRouter };
