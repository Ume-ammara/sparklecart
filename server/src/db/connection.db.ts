import mongoose from "mongoose";
import { env } from "../config/env.config.js";

const mongoURI = env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("MONGODB CONNECTION FAILED:", error);
    process.exit(1);
  }
};

export { connectDB };
