import { Router } from "express";
import { getAllProductsController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/").get(getAllProductsController);

export { productRouter };
