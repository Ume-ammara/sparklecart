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
  createProduct: (formData: ProductFormDTO) => Promise<void>;

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

  becomeASeller: async (data) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.post("/seller", data);
      set({ success: res.data?.message });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to become a seller",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSellerProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosClient.get("/seller/products");
      set({
        sellerProducts: res.data.data.products,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch products",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSellerProductById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosClient.get(`/seller/products/${id}`);
      set({ sellerProduct: res.data.data.product });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch product",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      const data = toFormData(formData);

      const res = await axiosClient.post("/seller/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        sellerProducts: state.sellerProducts
          ? [res.data.data.product, ...state.sellerProducts]
          : [res.data.data.product],
        success: res.data.data.message,
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to create product",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, updateData) => {
    try {
      set({ isLoading: true, error: null });

      const data = toFormData(updateData);
      const res = await axiosClient.patch(`/seller/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        sellerProducts: state.sellerProducts
          ? state.sellerProducts.map((p) =>
              p._id === id ? res.data.data.product : p
            )
          : state.sellerProducts,
        sellerProduct: res.data.data.product,
        success: res.data.data.message,
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to update product",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await axiosClient.delete(`/seller/products/${id}`);

      set((state) => ({
        sellerProducts: state.sellerProducts?.filter((p) => p._id !== id),
        success: "Product deleted",
      }));
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to delete product",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAllProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      await axiosClient.delete("/seller/products");
      set({
        sellerProducts: [],
        sellerProduct: null,
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
