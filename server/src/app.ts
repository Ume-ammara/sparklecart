import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.config.js";
import { connectDB } from "./db/connection.db.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
// Trust proxy settings for ip address retrieval
app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom Middleware can be added here

// Database connection can be established here
connectDB();

// Importing all routes here
import { healthRouter } from "./routes/health.route.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { sellerRouter } from "./routes/seller.route.js";
import { productRouter } from "./routes/product.route.js";
import { wishlistRouter } from "./routes/wishlist.route.js";
import { cartRouter } from "./routes/cart.route.js";
import { checkoutRouter } from "./routes/checkout.route.js";
import { webhookRouter } from "./routes/webhook.route.js";

// Using all routes here
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/wishlists", wishlistRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/checkouts", checkoutRouter);
app.use("/api/v1/webhook", webhookRouter)

// Error handling middleware
import { errorHandler } from "./middlewares/error.middleware.js";
app.use(errorHandler);

export { app };
