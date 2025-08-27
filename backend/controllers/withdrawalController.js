const Withdrawal = require('../models/Withdrawal');

exports.requestWithdrawal = async (req, res) => {
  try {
    const { amount, bankDetails } = req.body;
    if (amount > req.user.balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    const withdrawal = new Withdrawal({ userId: req.user._id, amount, bankDetails });
    await withdrawal.save();
    res.json({ message: 'Withdrawal request submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getWithdrawalHistory = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ userId: req.user._id }).sort({ requestedAt: -1 });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
