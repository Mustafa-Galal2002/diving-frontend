import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL, // ✅ استخدم متغير البيئة
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login"); // إعادة توجيه لتسجيل الدخول
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // لو حبيت توقف الـ interceptor
    };
  }, [navigate]);
};

export default useAuthInterceptor;
