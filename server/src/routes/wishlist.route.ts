import { Router } from "express";
import {
  addToWishlistController,
  clearWishlistController,
  getAllWishlistController,
  removeFromWishlistController,
} from "../controllers/wishlist.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const wishlistRouter = Router();

wishlistRouter.route("/").get(isLoggedIn, getAllWishlistController);
wishlistRouter.route("/").post(isLoggedIn, addToWishlistController);
wishlistRouter.route("/").delete(isLoggedIn, removeFromWishlistController);
wishlistRouter.route("/clear").delete(isLoggedIn, clearWishlistController);

export { wishlistRouter };
