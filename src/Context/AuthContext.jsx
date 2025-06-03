import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(JSON.parse(localStorage.getItem("authToken")).access)
      : null
  );

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const loginUser = async (e, username, password) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password: password,
      }),
    });

    if (response.status === 500) {
      toast.error("Server Error !");
      return;
    }

    const data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          refresh: data.refresh,
          access: data.access,
        })
      );

      toast.success("Welcome Back!");
      navigate("/");
    } else {
      toast.error("Error Logging in: " + data.detail);
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const updateToken = async () => {
    const response = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authToken?.refresh,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    if (authToken) {
      const expired = isTokenExpired(authToken.access);
      if (expired) {
        logoutUser();
        return;
      }
    }

    const interval = setInterval(() => {
      if (authToken) {
        const expired = isTokenExpired(authToken.access);
        if (expired) {
          logoutUser();
        } else {
          updateToken();
        }
      }
    }, 1000 * 10 * 60);

    return () => clearInterval(interval);
  }, [authToken]);

  const contextData = {
    user,
    authToken,
    loginUser,
    logoutUser,
    updateToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
