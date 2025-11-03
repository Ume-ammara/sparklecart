import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware can be added here

// Database connection can be established here
connectDB();

// Importing all routes here
import { healthRouter } from "./routes/health.route.js";
import { connectDB } from "./db/connection.db.js";

// Using all routes here
app.use("/api/v1/health", healthRouter);

export { app };
