import api from "./api";
import type { AxiosRequestConfig } from "axios";

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => api.post<T>(url, data, config),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => api.put<T>(url, data, config),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => api.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config),
};