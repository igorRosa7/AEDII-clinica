import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:8000",
});

export default api;