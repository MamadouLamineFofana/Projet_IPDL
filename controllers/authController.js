const userModel = require("../models/userModel");
const donorModel = require("../models/donorModel");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
  res.render("register", { pageTitle: "Inscription", user: req.session, error: req.flash('error') });
};

exports.register = async (req, res) => {
  const { email, password, first_name, last_name, blood_type } = req.body;
  const existing = await userModel.findByEmail(email);
  if (existing) {
    req.flash('error', 'Email déjà utilisé');
    return res.redirect("/auth/register");  // Redirection avec message d'erreur
  }
  const userId = await userModel.createUser({ email, password, first_name, last_name });
  await donorModel.createDonor({ user_id: userId, blood_type, medical_history: [] });
  res.redirect("/auth/login");
};

exports.showLogin = (req, res) => {
  res.render("login", { pageTitle: "Connexion", user: req.session, error: req.flash('error') });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) {
    req.flash('error', 'Email inconnu');
    return res.redirect("/auth/login");  // Redirection avec message d'erreur
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.flash('error', 'Mot de passe incorrect');
    return res.redirect("/auth/login");  // Redirection avec message d'erreur
  }
  req.session.userId = user.id;
  req.session.role = user.role;
  res.redirect("/");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};


// Chemin : controllers/authController.js

exports.showLogin = (req, res) => {
  res.render("login", { pageTitle: "Connexion", user: req.session });
};

exports.showRegister = (req, res) => {
  res.render("register", { pageTitle: "Inscription", user: req.session });
};
