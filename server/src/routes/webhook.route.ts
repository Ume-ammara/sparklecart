import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { handleStripeEventController } from "../controllers/webhook.controller.js";

const webhookRouter = Router();

webhookRouter.route("/stripe").post(handleStripeEventController);

export { webhookRouter };
