const Campaign = require('../models/Campaign');
const User = require('../models/User');
const { success, error } = require('../utils/apiResponse');

exports.dashboard = async (req, res) => {
  try {
    const [campaigns, users] = await Promise.all([
      Campaign.findAllActive(),
      User.findRecentDonors()
    ]);
    
    res.render('admin/dashboard', {
      campaigns,
      recentDonors: users,
      title: 'Tableau de bord'
    });
  } catch (err) {
    error(res, 'Erreur du tableau de bord');
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const campaignId = await Campaign.create({
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.startDate,
      end_date: req.body.endDate,
      created_by: req.userId
    });
    
    success(res, { campaignId }, 201);
  } catch (err) {
    error(res, 'Erreur de création de campagne');
  }
};