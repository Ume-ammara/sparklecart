import { axiosClient } from "@/api/axiosClient";
import { CartDTO } from "@/types/cartType";
import { create } from "zustand";

type CartStore = {
  carts: CartDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchAllCarts: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearAllCart: () => Promise<void>;
  updateCartQuantity: (cartItemId: string, quantity: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  carts: null,
  isLoading: false,
  error: null,
  success: null,

  /* ================= FETCH ================= */
  fetchAllCarts: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosClient.get("/carts");

      set({
        carts: res.data.data.cartItems,
        success: res.data.data.message,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch cart items",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= ADD ================= */
  addToCart: async (productId, quantity = 1) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosClient.post("/carts", {
        productId,
        quantity,
      });

      set({
        carts: res.data.data.cartItems,
        success: res.data.data.message,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to add product to cart",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= REMOVE ================= */
  removeFromCart: async (cartItemId) => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete(`/carts/${cartItemId}`);

      set((state) => ({
        carts: state.carts
          ? state.carts.filter((item) => item._id !== cartItemId)
          : [],
        success: "Item removed from cart",
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to remove cart item",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= CLEAR ================= */
  clearAllCart: async () => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete("/carts/clear");

      set({
        carts: [],
        success: "Cart cleared successfully",
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to clear cart",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= UPDATE QUANTITY ================= */
  updateCartQuantity: async (cartItemId, quantity) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosClient.patch(`/carts/${cartItemId}/quantity`, {
        quantity,
      });

      const updatedItem = res.data.data.cartItem;

      set((state) => ({
        carts: state.carts
          ? state.carts.map((item) =>
              item._id === cartItemId ? updatedItem : item
            )
          : state.carts,
        success: res.data.message || "Cart updated successfully",
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to update cart quantity",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
