import { axiosClient } from "@/api/axiosClient";
import { ProductFormDTO } from "@/schemas/productSchema";
import { ProductDTO } from "@/types/productType";
import { toFormData } from "@/util/sanitize";

import { create } from "zustand";

type ProductStore = {
  sellerProduct: ProductDTO | null;
  sellerProducts: ProductDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  fetchSellerProducts: () => void;
  createProduct: (formData: ProductFormDTO) => void;
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

  createProduct: async (formData: ProductFormDTO) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const data = toFormData(formData);
      const res = await axiosClient.post("/seller/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({
        success: res.data.data.message,
        sellerProducts: [get().sellerProducts, ...res.data.data.products],
      });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useSellerStore };
