// src/components/Login.jsx
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useApp } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login, register } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isLogin) {
        await login(form.phone, form.password);
        setMessage("Login successful!");
        navigate("/");
      } else {
        await register(form.username, form.phone, form.password);
        setMessage("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-500">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-16 mb-3" />
          <h1 className="text-xl font-semibold text-gray-700">
            {isLogin ? "Login" : "Register"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-2 ${
              isLogin
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-2 ${
              !isLogin
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        {message && (
          <div className="mb-4 text-center text-sm text-red-600">{message}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
