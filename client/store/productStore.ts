import { axiosClient } from "@/api/axiosClient";
import { ProductDTO } from "@/types/productType";

import { create } from "zustand";

type ProductStore = {
  product: ProductDTO | null;
  products: ProductDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchAllProducts: () => void;
};

const useProductStore = create<ProductStore>((set, get) => ({
  product: null,
  products: null,
  isLoading: false,
  error: null,
  success: null,

  fetchAllProducts: async () => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get("/products");
      set({ success: res.data.data.message, products: res.data.data.products });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductById: async (slug: string) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get(`/products/${slug}`);
      set({ product: res.data.data.product, success: res.data.message });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useProductStore };
