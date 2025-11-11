import { z } from "zod";

export const becomeAsellerSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters"),
  storeDescription: z
    .string()
    .trim()
    .min(10, "Description should be at least 10 characters")
    .max(500, "Description too long"),
  userId: z.string().nonempty("User id is required"),
});

export type BecomeASeller = z.infer<typeof becomeAsellerSchema>;
