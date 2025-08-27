import React, { useState, useEffect, createContext, useContext } from "react";
import apiService from "../services/apiService";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (token) validateToken();
  }, [token]);

  const validateToken = async () => {
    // Optionally, fetch user info with token
    // For now, just keep token in state
  };

  const login = async (phone, password) => {
    const res = await apiService.login(phone, password);
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      setActiveTab("dashboard");
    } else {
      throw new Error(res.message || "Login failed");
    }
  };

  const register = async (username, phone, password) => {
    const res = await apiService.register(username, phone, password);
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      setActiveTab("dashboard");
    } else {
      throw new Error(res.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
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
