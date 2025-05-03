const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware"); // Si tu veux protéger l'inscription

router.get("/", campaignController.list);
router.get("/:id", campaignController.details);

// Route POST pour l'inscription à une campagne
router.post("/:id/register", ensureAuthenticated, campaignController.registerToCampaign);

module.exports = router;
