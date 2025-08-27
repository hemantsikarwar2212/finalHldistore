const API_BASE_URL = 'http://localhost:5000/api';

const apiService = {
  login: async (phone, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    return response.json();
  },
  register: async (username, phone, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, phone, password })
    });
    return response.json();
  },
  getDashboard: async (token) => {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  getProducts: async (type) => {
    const response = await fetch(`${API_BASE_URL}/products/${type}`);
    return response.json();
  },
  recharge: async (token, amount) => {
    const response = await fetch(`${API_BASE_URL}/wallet/recharge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ amount })
    });
    return response.json();
  },
  invest: async (token, productId) => {
    const response = await fetch(`${API_BASE_URL}/wallet/invest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId })
    });
    return response.json();
  },
  createOrder: async (token, productId, amount) => {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId, amount })
    });
    return response.json();
  },
  verifyPayment: async (token, paymentData) => {
    const response = await fetch(`${API_BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  },
  requestWithdrawal: async (token, amount, bankDetails) => {
    const response = await fetch(`${API_BASE_URL}/withdrawal/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ amount, bankDetails })
    });
    return response.json();
  },
  getWithdrawalHistory: async (token) => {
    const response = await fetch(`${API_BASE_URL}/withdrawal/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  getUsers: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  getTransactions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/transactions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  getWithdrawals: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/withdrawals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateWithdrawal: async (token, withdrawalId, status, adminNotes) => {
    const response = await fetch(`${API_BASE_URL}/admin/withdrawal/${withdrawalId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status, adminNotes })
    });

    return response.json();
  }
};

export default apiService;
