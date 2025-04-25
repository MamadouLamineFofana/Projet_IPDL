const Donor = require('../models/Donor');
const Appointment = require('../models/Appointment');
const { success, error } = require('../utils/apiResponse');

exports.getProfile = async (req, res) => {
  try {
    const donor = await Donor.findByUserId(req.userId);
    const appointments = await Appointment.findByDonor(req.userId);
    
    res.render('donor/profile', {
      donor,
      appointments,
      title: 'Mon Profil Donneur'
    });
  } catch (err) {
    error(res, 'Erreur lors de la récupération du profil');
  }
};

exports.updateMedicalInfo = async (req, res) => {
  try {
    await Donor.updateMedicalInfo(req.userId, {
      blood_type: req.body.bloodType,
      medical_history: req.body.medicalHistory
    });
    
    success(res, { message: 'Informations médicales mises à jour' });
  } catch (err) {
    error(res, 'Erreur de mise à jour des informations');
  }
};