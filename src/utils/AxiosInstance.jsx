import axios from "axios";

// ✅ Use base URL from .env
const baseURL = import.meta.env.VITE_API_URL;

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      config.headers["Authorization"] = `Bearer ${tokenData.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
