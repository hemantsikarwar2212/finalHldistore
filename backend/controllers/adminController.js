const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Withdrawal = require('../models/Withdrawal');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('userId', 'username email')
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({})
      .populate('userId', 'username email')
      .sort({ requestedAt: -1 });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) return res.status(404).json({ message: 'Withdrawal not found' });
    withdrawal.status = status;
    withdrawal.adminNotes = adminNotes;
    withdrawal.processedAt = new Date();
    await withdrawal.save();
    if (status === 'approved') {
      const user = await User.findById(withdrawal.userId);
      user.balance -= withdrawal.amount;
      await user.save();
      const Transaction = require('../models/Transaction');
      const transaction = new Transaction({ userId: withdrawal.userId, type: 'withdrawal', amount: withdrawal.amount, status: 'completed' });
      await transaction.save();
    }
    res.json({ message: 'Withdrawal updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
