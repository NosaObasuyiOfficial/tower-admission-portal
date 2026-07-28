import axios, {
  type AxiosInstance
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL!,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
      config.headers["portal-key"] = import.meta.env.PORTAL_KEY!;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;