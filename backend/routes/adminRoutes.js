const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/users', authenticateToken, requireAdmin, adminController.getUsers);
router.get('/transactions', authenticateToken, requireAdmin, adminController.getTransactions);
router.get('/withdrawals', authenticateToken, requireAdmin, adminController.getWithdrawals);
router.put('/withdrawal/:id', authenticateToken, requireAdmin, adminController.updateWithdrawal);

module.exports = router;
