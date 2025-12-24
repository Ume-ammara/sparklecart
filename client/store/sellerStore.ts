import { axiosClient } from "@/api/axiosClient";
import { ProductDTO } from "@/types/productType";

import { create } from "zustand";

type ProductStore = {
  sellerProduct: ProductDTO | null;
  sellerProducts: ProductDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchSellerProducts: () => void;
};

const useSellerStore = create<ProductStore>((set, get) => ({
  sellerProduct: null,
  sellerProducts: null,
  isLoading: false,
  error: null,
  success: null,

  fetchSellerProducts: async () => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get("/seller/products");
      set({
        success: res.data.data.message,
        sellerProducts: res.data.data.products,
      });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useSellerStore };
