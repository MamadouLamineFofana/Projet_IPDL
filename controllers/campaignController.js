const campaignModel = require("../models/campaignModel");

exports.list = async (req, res) => {
  const campaigns = await campaignModel.getActiveCampaigns();
  res.render("campaigns", { pageTitle: "Campagnes", campaigns, user: req.session });
};

exports.details = async (req, res) => {
  const campaign = await campaignModel.getCampaignById(req.params.id);
  res.render("campaign_details", { pageTitle: "Détails Campagne", campaign, user: req.session });
};

exports.registerToCampaign = async (req, res) => {
  const userId = req.session.userId;
  const campaignId = req.params.id;
  try {
    await campaignModel.registerUserToCampaign(userId, campaignId);
    res.redirect('/campaigns/' + campaignId + '?success=1');
  } catch (error) {
    console.error('Erreur inscription campagne:', error);
    res.redirect('/campaigns/' + campaignId + '?error=1');
  }
};
