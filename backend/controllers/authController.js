const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ phone }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, phone, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.status(201).json({ token, user: { id: user._id, username, phone, balance: user.balance } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ token, user: { id: user._id, username: user.username, phone: user.phone, balance: user.balance, totalIncome: user.totalIncome, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
