const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const { authenticate } = require('../middlewares/auth');

router.get('/profile', authenticate, donorController.getProfile);
router.put('/medical-info', authenticate, donorController.updateMedicalInfo);

module.exports = router;