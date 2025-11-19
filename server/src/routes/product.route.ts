import { Router } from "express";
import {
  getAllProductsByBrandController,
  getAllProductsController,
  getProductBySlugController,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/").get(getAllProductsController);
productRouter.route("/:slug").get(getProductBySlugController);
productRouter.route("/brand/:slug").get(getAllProductsByBrandController);

export { productRouter };
