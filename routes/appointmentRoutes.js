// Chemin : routes/appointmentRoutes.js

const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", ensureAuthenticated, appointmentController.list);
router.get("/new/:campaignId", ensureAuthenticated, appointmentController.showForm);
router.post("/", ensureAuthenticated, appointmentController.create);
router.post("/:id/cancel", ensureAuthenticated, appointmentController.cancel);

module.exports = router;
