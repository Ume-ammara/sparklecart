import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const axiosClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (
      (error?.response?.data as { message?: string }).message ===
      "ACCESS_TOKEN_EXPIRED"
    ) {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        await axiosClient.post("/auth/refresh");
        return axiosClient(originalRequest);
      } catch (error) {
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient };