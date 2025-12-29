import { axiosClient } from "@/api/axiosClient";
import { ProductFormDTO } from "@/schemas/productSchema";
import { SellerFormDTO } from "@/schemas/sellerSchema";
import { ProductDTO } from "@/types/productType";
import { toFormData } from "@/util/sanitize";

import { create } from "zustand";

type ProductStore = {
  sellerProduct: ProductDTO | null;
  sellerProducts: ProductDTO[] | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  becomeASeller: (data: SellerFormDTO) => Promise<void>;
  fetchSellerProducts: () => void;
  fetchSellerProductById: (productId: string) => void;
  createProduct: (formData: ProductFormDTO) => void;

  updateProduct: (id: string, data: Partial<ProductFormDTO>) => Promise<void>;

  deleteProduct: (id: string) => Promise<void>;
  deleteAllProducts: () => Promise<void>;
};

const useSellerStore = create<ProductStore>((set, get) => ({
  sellerProduct: null,
  sellerProducts: null,
  isLoading: false,
  error: null,
  success: null,

  // Become A Seller
  becomeASeller: async (data) => {
    try {
      set({ isLoading: true, error: null, success: null });

      const res = await axiosClient.post("/seller", data);
      set({
        success: res.data?.message || "Seller account created successfully",
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to become a seller. Please try again.",
      });
    } finally {
      set({ isLoading: false });
    }
  },

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

  fetchSellerProductById: async (productId) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get(`/seller/products/${productId}`);
      set({
        success: res.data.data.message,
        sellerProduct: res.data.data.product,
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

  // UPDATE
  updateProduct: async (id, updateData) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosClient.patch(`/seller/products/${id}`, updateData);
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to update product",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // DELETE ONE
  deleteProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete(`/seller/products/${id}`);

      set((state) => ({
        sellerProducts: state.sellerProducts
          ? state.sellerProducts.filter((p) => p._id !== id)
          : [],
        success: "Product deleted successfully",
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to delete product",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // DELETE ALL
  deleteAllProducts: async () => {
    try {
      set({ isLoading: true, error: null });

      await axiosClient.delete("/seller/products");

      set({
        sellerProducts: [],
        success: "All products deleted",
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to delete products",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useSellerStore };
