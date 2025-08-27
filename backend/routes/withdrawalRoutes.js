const express = require('express');
const router = express.Router();
const withdrawalController = require('../controllers/withdrawalController');
const { authenticateToken } = require('../middleware/auth');

router.post('/request', authenticateToken, withdrawalController.requestWithdrawal);
router.get('/history', authenticateToken, withdrawalController.getWithdrawalHistory);

module.exports = router;
