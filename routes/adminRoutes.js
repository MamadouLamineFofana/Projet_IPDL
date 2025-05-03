const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const { ensureAdmin } = require("../middlewares/roleMiddleware");

router.get("/", ensureAuthenticated, ensureAdmin, adminController.dashboard);
router.get("/campaign/new", ensureAuthenticated, ensureAdmin, adminController.showCampaignForm);
router.post("/campaign/new", ensureAuthenticated, ensureAdmin, adminController.createCampaign);
router.post("/campaign/:id/close", ensureAuthenticated, ensureAdmin, adminController.closeCampaign);
router.get("/history", ensureAuthenticated, ensureAdmin, adminController.history);
router.get("/statistics", ensureAuthenticated, ensureAdmin, adminController.statistics);

module.exports = router;
