const appointmentModel = require("../models/appointmentModel");
const donorModel = require("../models/donorModel");
const campaignModel = require("../models/campaignModel");
const centerModel = require("../models/centerModel");

exports.showForm = async (req, res) => {
  const campaign = await campaignModel.getCampaignById(req.params.campaignId);
  const centers = await centerModel.getAllCenters();
  res.render("appointment_form", { pageTitle: "Prendre rendez-vous", campaign, centers, user: req.session });
};

exports.create = async (req, res) => {
  const donor = await donorModel.findByUserId(req.session.userId);
  await appointmentModel.createAppointment({
    donor_id: donor.id,
    campaign_id: req.body.campaign_id,
    center_id: req.body.center_id,
    date_time: req.body.date_time
  });
  res.redirect("/appointments");
};

exports.list = async (req, res) => {
  const donor = await donorModel.findByUserId(req.session.userId);
  const appointments = await appointmentModel.getAppointmentsByDonor(donor.id);
  res.render("appointments", { pageTitle: "Mes rendez-vous", appointments, user: req.session });
};

exports.cancel = async (req, res) => {
  await appointmentModel.cancelAppointment(req.params.id);
  res.redirect("/appointments");
};
