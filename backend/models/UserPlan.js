const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  dailyProfit: { type: Number, required: true },
  totalEarned: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  lastProfitDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserPlan', userPlanSchema);
