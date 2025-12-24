import { z } from "zod";

export const productSchema = z.object({
  slug: z.string().min(3).max(100).toLowerCase(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  category: z.string().toLowerCase().min(3).max(50),
  images: z
    .array(z.string().nonempty("Image URL cannot be empty"))
    .min(1, "At least one image is required")
    .optional(),
  brand: z.object({
    slug: z.string().nonempty("brand slug is required").toLowerCase(),
    name: z.string().nonempty("name is required"),
    description: z.string().nonempty("description is required"),
    country: z.string().nonempty("country is required"),
  }),
  userId: z.string().nonempty("User id is required"),
});

export type ProductFormDTO = z.infer<typeof productSchema>;
