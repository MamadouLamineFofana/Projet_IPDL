const campaignModel = require("../models/campaignModel");

exports.index = async (req, res) => {
  const campaigns = await campaignModel.getActiveCampaigns();
  res.render("index", { pageTitle: "Accueil", campaigns, user: req.session });
};

exports.about = (req, res) => {
  res.render("about", { pageTitle: "À propos", user: req.session });
};


// Chemin : controllers/homeController.js


exports.about = (req, res) => {
  res.render("about", { pageTitle: "À propos", user: req.session });
};
