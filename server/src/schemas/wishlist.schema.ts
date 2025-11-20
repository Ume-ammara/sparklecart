import z from "zod";

export const getAllWishlistSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
});

export const addToWishlistSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  userId: z.string().nonempty("User ID is required"),
});

export const removeFromWishlistSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  userId: z.string().nonempty("User ID is required"),
});

export const clearWishlistSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
});

export type GetAllWishlistDTO = z.infer<typeof getAllWishlistSchema>;
export type AddToWishlistDTO = z.infer<typeof addToWishlistSchema>;
export type RemoveFromWishlistDTO = z.infer<typeof removeFromWishlistSchema>;
export type ClearWishlistDTO = z.infer<typeof clearWishlistSchema>;
