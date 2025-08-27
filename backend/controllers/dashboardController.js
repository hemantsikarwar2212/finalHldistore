const User = require('../models/User');
const UserPlan = require('../models/UserPlan');
const Transaction = require('../models/Transaction');

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const activePlans = await UserPlan.find({ userId: req.user._id, isActive: true }).populate('productId');
    const recentTransactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(10);
    res.json({ balance: user.balance, totalIncome: user.totalIncome, activePlans, recentTransactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
