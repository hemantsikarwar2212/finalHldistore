import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext.jsx";
import Login from "./components/Userlogin.jsx";
import Products from "./pages/Products.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Withdrawals from "./pages/Withdrawals.jsx";
import Profile from "./pages/Profile.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

const App = () => {
  const { user } = useApp();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/products"
        element={user ? <Products /> : <Navigate to="/login" />}
      />
      <Route
        path="/withdrawals"
        element={user ? <Withdrawals /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={user && user.isAdmin ? <AdminPanel /> : <Navigate to="/" />}
      />
      {/* 404 fallback */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
