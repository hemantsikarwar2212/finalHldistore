const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    accountHolder: String,
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
  requestedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
