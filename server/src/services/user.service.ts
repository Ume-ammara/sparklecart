import { User } from "../models/user.model.js";
import { GetUserProfileDTO } from "../schemas/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { sanitizeUser } from "../utils/sanitize.js";

export const getUserProfileService = async ({ userId }: GetUserProfileDTO) => {
  logger.info(`Fetching user profile for userId: ${userId}`);

  const user = await User.findById(userId);

  if (!user) {
    logger.error(`User not found with userId: ${userId}`);
    throw new ApiError(404, "User not found");
  }

  logger.info(`User profile fetched successfully for userId: ${userId}`);

  return sanitizeUser(user);
};
