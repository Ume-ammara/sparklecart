import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  getAllOrdersByUserController,
  getOrderByIdController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.route("/").get(isLoggedIn, getAllOrdersByUserController);
orderRouter.route("/:orderId").get(isLoggedIn, getOrderByIdController);

export { orderRouter };
