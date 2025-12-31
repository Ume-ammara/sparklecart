import { axiosClient } from "@/api/axiosClient";
import { LoginFormDTO, RegisterFormDTO } from "@/schemas/authSchema";
import { UserDTO } from "@/types/userType";

import { create } from "zustand";

type AuthStore = {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;

  registerUser: (formData: RegisterFormDTO) => void;
  loginUser: (formData: LoginFormDTO) => void;
  logoutUser: () => void;
  fetchUserProfile: () => void;
};

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  success: null,

  registerUser: async (formData: RegisterFormDTO) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.post("/auth/register", formData);
      set({ success: res.data.message });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (formData: LoginFormDTO) => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.post("/auth/login", formData);
      set({
        success: res.data.message,
        user: res.data.data?.user,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProfile: async () => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.get("/users/profile");
      set({ user: res.data.data?.user, isAuthenticated: true });
    } catch (error: any) {
      console.log("ERROR IN COUNT :", error);
      set({
        error:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async () => {
    try {
      set({ isLoading: true, error: null, success: null });
      const res = await axiosClient.post("/auth/logout");
      set({ success: res.data.message, user: null, isAuthenticated: false });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useAuthStore };
