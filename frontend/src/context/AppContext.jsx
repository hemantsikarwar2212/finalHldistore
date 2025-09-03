import React, { useState, useEffect, createContext, useContext } from "react";
import apiService from "../services/apiService";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (token && !user) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      // If your backend supports validation, call it here:
      // const res = await apiService.validateToken(token);
      // if (res.valid) setUser(res.user);
      // else logout();
    } catch {
      logout();
    }
  };

  const login = async (phone, password) => {
    const res = await apiService.login(phone, password);
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setActiveTab("dashboard");
      return res.user;
    } else {
      throw new Error(res.message || "Login failed");
    }
  };

  const register = async (username, phone, password) => {
    const res = await apiService.register(username, phone, password);

    // Case 1: backend just returns success flag
    if (res.success) {
      return res;
    }

    // Case 2: backend also returns token + user (optional auto-login)
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setActiveTab("dashboard");
      return res.user;
    }

    throw new Error(res.message || "Registration failed");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setActiveTab("dashboard");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
