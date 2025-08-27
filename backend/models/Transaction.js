const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'profit', 'investment'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  orderId: { type: String },
  paymentId: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
