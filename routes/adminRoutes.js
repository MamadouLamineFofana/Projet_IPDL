const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/dashboard', authenticate, isAdmin, adminController.dashboard);
router.post('/campaigns', authenticate, isAdmin, adminController.createCampaign);

module.exports = router;