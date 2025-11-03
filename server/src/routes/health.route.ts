import { Router } from "express";
import { healthCheckController } from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.route("/").get(healthCheckController);

export { healthRouter };
