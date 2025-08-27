const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  dailyProfit: { type: Number, required: true },
  duration: { type: Number, required: true },
  totalReturn: { type: Number, required: true },
  type: { type: String, enum: ['day', 'vip'], required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productSchema);
