const express = require('express');
const router = express.Router();
const rechargeController = require('../controllers/rechargeController');
const investController = require('../controllers/investController');
const { authenticateToken } = require('../middleware/auth');

// Recharge (deposit funds)
router.post('/recharge', authenticateToken, rechargeController.rechargeWallet);

// Invest (purchase a plan)
router.post('/invest', authenticateToken, investController.investInPlan);

module.exports = router;
