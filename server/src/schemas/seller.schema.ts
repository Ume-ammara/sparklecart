import { z } from "zod";

export const becomeAsellerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description should be at least 10 characters")
    .max(500, "Description too long"),
  userId: z.string().nonempty("User id is required"),
});

export const createProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  category: z.string().min(3).max(50),
  images: z
    .array(z.string().nonempty("Image URL cannot be empty"))
    .min(1, "At least one image is required")
    .optional(),
  brand: z.object({
    name: z.string().nonempty("name is required"),
    description: z.string().nonempty("description is required"),
    country: z.string().nonempty("country is required"),
  }),
  userId: z.string().nonempty("User id is required"),
});

export const getAllProductsSchema = z.object({
  userId: z.string().nonempty("Product id is required"),
});

export const updateAllProductsSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  category: z.string().min(3).max(50),
  images: z
    .array(z.string().nonempty("Image URL cannot be empty"))
    .min(1, "At least one image is required")
    .optional(),

  userId: z.string().nonempty("User id is required"),
});

export type BecomeASellerDTO = z.infer<typeof becomeAsellerSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type getAllProductsDTO = z.infer<typeof getAllProductsSchema>;
export type updateAllProductsDTO = z.infer<typeof updateAllProductsSchema>;
