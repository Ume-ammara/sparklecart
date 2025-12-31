import { axiosClient } from "@/api/axiosClient";
import { create } from "zustand";
import { WishlistDTO } from "@/types/wishlistType";

type WishlistStore = {
  wishlists: WishlistDTO| null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchAllWishlists: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlists: null,
  isLoading: false,
  error: null,
  success: null,

  /* ================= FETCH ================= */
  fetchAllWishlists: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosClient.get("/wishlists");

      set({
        wishlists: res.data.data.wishlistItems,
        success: res.data.data.message,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch wishlist items",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= ADD ================= */
  addToWishlist: async (productId) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosClient.post("/wishlists", {
        productId,
      });

      set({
        wishlists: res.data.data.wishlistItems,
        success: res.data.data.message,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message || "Failed to add product to wishlist",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= REMOVE ================= */
  removeFromWishlist: async (productId) => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete("/wishlists", {
        data: { productId },
      });

      set((state) => ({
        wishlists: state.wishlists
          ? state.wishlists.filter((item) => item.product._id !== productId)
          : [],
        success: "Item removed from wishlist",
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to remove wishlist item",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= CLEAR ================= */
  clearWishlist: async () => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete("/wishlists/clear");

      set({
        wishlists: [],
        success: "Wishlist cleared successfully",
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to clear wishlist",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
