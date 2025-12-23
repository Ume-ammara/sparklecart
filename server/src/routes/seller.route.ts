import { Router } from "express";
import { isLoggedIn, isSeller } from "../middlewares/auth.middleware.js";
import {
  becomeASellerController,
  createProductController,
  deleteAllSellerProductsController,
  deleteProductByIdController,
  getAllSellerProductsController,
  getProductByIdController,
  updateAllProductsController,
  updateProductByIdController,
} from "../controllers/seller.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const sellerRouter = Router();

sellerRouter.route("/").post(isLoggedIn, becomeASellerController);
sellerRouter
  .route("/products")
  .get(isLoggedIn, isSeller, getAllSellerProductsController)
  .post(isLoggedIn, isSeller, upload.array("images", 5), createProductController)
  .delete(isLoggedIn, isSeller, deleteAllSellerProductsController)
  .patch(isLoggedIn, isSeller, updateAllProductsController);
sellerRouter
  .route("/products/:id")
  .get(isLoggedIn, isSeller, getProductByIdController)
  .patch(isLoggedIn, isSeller, updateProductByIdController)
  .delete(isLoggedIn, isSeller, deleteProductByIdController);

export { sellerRouter };
