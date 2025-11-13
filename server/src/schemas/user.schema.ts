import { z } from "zod";

export const getUserProfileSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
});


export type GetUserProfileDTO = z.infer<typeof getUserProfileSchema>;