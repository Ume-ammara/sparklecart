import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.config.js";
import jwt from "jsonwebtoken";
import { AppUser } from "../types/auth.type.js";
import { logger } from "../utils/logger.js";

export const isLoggedIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.clearCookie("refreshToken");
      throw new ApiError(401, "Refresh token expired please login");
    }

    const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      logger.warn(`Access token is invalid or expired`);
      throw new ApiError(401, "ACCESS_TOKEN_EXPIRED");
    }

    const decode = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AppUser;
    req.user = decode;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token", error);
  }
});

export const isSeller = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("seller user", req.user);
  if (req.user.role !== "seller" && req.user.sellerId !== null) {
    throw new ApiError(403, "Unauthorized request");
  }
  next();
});
