import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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
import { connectDB } from "./db/connection.db.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { sellerRouter } from "./routes/seller.route.js";
import { productRouter } from "./routes/product.route.js";

// Using all routes here
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/products", productRouter);

// Error handling middleware
import { errorHandler } from "./middlewares/error.middleware.js";
app.use(errorHandler);

export { app };
