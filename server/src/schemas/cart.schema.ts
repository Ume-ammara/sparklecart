import z from "zod";

export const addToCartSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  productId: z.string().nonempty("Prodcut id is required"),
  quantity: z.number().min(1, "invalid quantity"),
});

export const getAllCartItemsSchema = z.object({
  userId: z.string().nonempty("User id is required"),
});

export const removeFromCartSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  cartItemId: z.string().nonempty("Prodcut id is required"),
});

export const clearCartItemsSchema = z.object({
  userId: z.string().nonempty("User id is required"),
});

export const updateCartQuantitySchema = z.object({
  userId: z.string().nonempty("User id is required"),
  cartItemId: z.string().nonempty("Cart item id is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type AddToCartProductDTO = z.infer<typeof addToCartSchema>;
export type GetAllCartItemsDTO = z.infer<typeof getAllCartItemsSchema>;
export type RemoveFromCartDTO = z.infer<typeof removeFromCartSchema>;
export type ClearCartItemsDTO = z.infer<typeof clearCartItemsSchema>;
export type UpdateCartQuantityDTO = z.infer<typeof updateCartQuantitySchema>;
