import { axiosClient } from "@/api/axiosClient";
import { CartDTO } from "@/types/cartType";

import { create } from "zustand";

type ProductStore = {
  carts: CartDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchAllCarts: () => void;
};

const useCartStore = create<ProductStore>((set, get) => ({
  carts: null,
  isLoading: false,
  error: null,
  success: null,

  fetchAllCarts: async () => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get("/carts");
      console.log("RES FOR CARTS : ", res);
      set({ success: res.data.data.message, carts: res.data.data.cartItems });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useCartStore };
