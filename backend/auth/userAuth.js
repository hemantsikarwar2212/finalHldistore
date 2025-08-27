const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Register User
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, phone, password } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
  // Save password as plain text (not recommended for production)
  const user = new User({ firstName, lastName, phone, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (password !== user.password) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single User
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, phone, password } = req.body;
    const updateData = { firstName, lastName, phone };
  if (password) updateData.password = password;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
