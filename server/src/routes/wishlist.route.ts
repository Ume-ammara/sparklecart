import { Router } from "express";
import {
  addToWishlistController,
  removeFromWishlistController,
} from "../controllers/wishlist.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const wishlistRouter = Router();

wishlistRouter.route("/").post(isLoggedIn, addToWishlistController);
wishlistRouter.route("/").delete(isLoggedIn, removeFromWishlistController);

export { wishlistRouter };
