import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import apiService from "../services/apiService";

const Task = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!user) return;
      try {
        // Replace with your actual endpoint for user investments
        const res = await apiService.getInvestments(user.token);
        setInvestments(res.investments || []);
      } catch {
        setInvestments([]);
      }
      setLoading(false);
    };
    fetchInvestments();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">My Investments</h1>
        {loading ? (
          <div>Loading...</div>
        ) : investments.length === 0 ? (
          <div>No investments found.</div>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="p-2 border">Plan</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv, i) => (
                <tr key={i}>
                  <td className="p-2 border">{inv.planName}</td>
                  <td className="p-2 border">₹{inv.amount}</td>
                  <td className="p-2 border">{new Date(inv.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Task;