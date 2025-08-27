const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.rechargeWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const user = await User.findById(req.user._id);
    user.balance += amount;
    await user.save();
    await Transaction.create({
      userId: user._id,
      type: 'deposit',
      amount,
      status: 'completed',
    });
    res.json({ message: 'Wallet recharged successfully', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
