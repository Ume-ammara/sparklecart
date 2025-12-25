import { z } from "zod";

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "Empty file is not allowed")
  .refine(
    (file) => file.type.startsWith("image/"),
    "Only image files are allowed"
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Image size must be under 5MB"
  );

export const productSchema = z.object({
  slug: z.string().min(3).max(100).toLowerCase(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),

  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),

  category: z.string().min(3).max(50).toLowerCase(),

  images: z.array(imageFileSchema).min(1, "At least one image is required"),

  brand: z.object({
    slug: z.string().min(1).toLowerCase(),
    name: z.string().min(1),
    description: z.string().min(1),
    country: z.string().min(1),
  })
});

export type ProductFormDTO = z.infer<typeof productSchema>;
