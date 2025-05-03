const campaignModel = require("../models/campaignModel");
const statisticsModel = require("../models/statisticsModel");

exports.dashboard = async (req, res) => {
  const stats = await statisticsModel.getGlobalStats();
  res.render("admin/admin_dashboard", { pageTitle: "Admin Dashboard", stats, user: req.session });
};

exports.showCampaignForm = (req, res) => {
  res.render("admin/campaign_form", { pageTitle: "Créer une campagne", user: req.session });
};

exports.createCampaign = async (req, res) => {
  await campaignModel.createCampaign({
    title: req.body.title,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: "active",
    created_by: req.session.userId
  });
  res.redirect("/admin");
};

exports.closeCampaign = async (req, res) => {
  await campaignModel.closeCampaign(req.params.id);
  res.redirect("/admin/history");
};

exports.history = async (req, res) => {
  // À compléter : récupérer l'historique des campagnes
  res.render("admin/history", { pageTitle: "Historique des campagnes", user: req.session });
};

exports.statistics = async (req, res) => {
  const stats = await statisticsModel.getGlobalStats();
  res.render("admin/statistics", { pageTitle: "Statistiques", stats, user: req.session });
};
