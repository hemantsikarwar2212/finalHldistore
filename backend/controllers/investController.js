const User = require('../models/User');
const Product = require('../models/Product');
const UserPlan = require('../models/UserPlan');
const Transaction = require('../models/Transaction');

exports.investInPlan = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (user.balance < product.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    user.balance -= product.price;
    await user.save();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + product.duration);
    await UserPlan.create({
      userId: user._id,
      productId: product._id,
      endDate,
      dailyProfit: product.dailyProfit,
    });
    await Transaction.create({
      userId: user._id,
      type: 'investment',
      amount: product.price,
      status: 'completed',
      productId: product._id,
    });
    res.json({ message: 'Investment successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
