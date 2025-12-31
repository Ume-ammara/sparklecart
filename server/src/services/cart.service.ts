import { Cart } from "../models/cart.model.js";
import {
  AddToCartProductDTO,
  ClearCartItemsDTO,
  GetAllCartItemsDTO,
  RemoveFromCartDTO,
} from "../schemas/cart.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { UpdateCartQuantityDTO } from "../schemas/cart.schema.js";

export const getAllCartItemsService = async ({ userId }: GetAllCartItemsDTO) => {
  logger.info(`Fetching cart items for user: ${userId}`);

  const cartItems = await Cart.find({ user: userId, isPurchased: false }).populate("product");

  logger.info(`Found ${cartItems.length} cart items for user: ${userId}`);
  return cartItems;
};

export const addToCartService = async ({ userId, productId, quantity }: AddToCartProductDTO) => {
  logger.info(`Adding product ${productId} to cart for user: ${userId} with quantity: ${quantity}`);

  let cartItem = await Cart.findOne({ user: userId, product: productId, isPurchased: false });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
    logger.info(
      `Updated quantity of product ${productId} in cart for user: ${userId} to ${cartItem.quantity}`
    );
  } else {
    cartItem = new Cart({
      user: userId,
      product: productId,
      quantity,
    });
    await cartItem.save();
    logger.info(`Added product ${productId} to cart for user: ${userId}`);
  }

  return cartItem;
};

export const removeFromCartService = async ({ userId, cartItemId }: RemoveFromCartDTO) => {
  logger.info(`Removing product ${cartItemId} from cart for user: ${userId}`);

  const result = await Cart.deleteOne({ user: userId, _id: cartItemId, isPurchased: false });

  if (result.deletedCount === 0) {
    logger.warn(`Product ${cartItemId} not found in cart for user: ${userId}`);
    throw new ApiError(404, "Product not found in cart");
  }

  logger.info(`Removed product ${cartItemId} from cart for user: ${userId}`);
  return;
};

export const clearCartItemsService = async ({ userId }: ClearCartItemsDTO) => {
  logger.info(`Clearing cart for user: ${userId}`);

  const result = await Cart.deleteMany({ user: userId, isPurchased: false });

  if (result.deletedCount === 0) {
    logger.warn(`No items found in cart to clear for user: ${userId}`);
    throw new ApiError(404, "No items found in cart to clear");
  }

  logger.info(`Cleared cart for user: ${userId}`);
  return;
};

export const updateCartQuantityService = async ({
  userId,
  cartItemId,
  quantity,
}: UpdateCartQuantityDTO) => {
  logger.info(`Updating cart item ${cartItemId} quantity to ${quantity} for user ${userId}`);

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  const updatedCartItem = await Cart.findOneAndUpdate(
    {
      _id: cartItemId,
      user: userId,
      isPurchased: false,
    },
    {
      quantity,
    },
    {
      new: true,
    }
  ).populate("product");

  if (!updatedCartItem) {
    logger.warn(`Cart item ${cartItemId} not found for user ${userId}`);
    throw new ApiError(404, "Cart item not found");
  }

  logger.info(`Cart item ${cartItemId} successfully updated to quantity ${quantity}`);

  return updatedCartItem;
};
