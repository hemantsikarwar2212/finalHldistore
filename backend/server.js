
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const adminRoutes = require('./routes/adminRoutes');
const walletRoutes = require('./routes/walletRoutes');
const productController = require('./controllers/productController');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Initialize default products
productController.initializeProducts();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/withdrawal', withdrawalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
