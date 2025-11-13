import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserProfileSchema } from "../schemas/user.schema.js";
import { getUserProfileService } from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserProfileController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getUserProfileSchema.safeParse({ userId: req.user._id });

  const user = await getUserProfileService(data);

  return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", { user }));
});
