const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");  // Ajout de connect-flash
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Ajout du middleware flash après session
app.use(flash());  // Middleware pour flash messages

// 🛠️ Middleware pour rendre `user` et `flash` disponible dans toutes les vues
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.error = req.flash('error');  // Pour transmettre les erreurs flash aux vues
  next();
});




// Chemin : main.js

//app.use((req, res, next) => {
 // res.locals.pageTitle = "Dons de Sang";
 // next();
//});


// Routes
app.use("/", require("./routes/homeRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/campaigns", require("./routes/campaignRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// Gestion des erreurs
const errorController = require("./controllers/errorController");
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Serveur lancé sur http://localhost:${app.get("port")}`);
});

app.use((req, res, next) => {
  res.locals.user = req.session;
  next();
});


app.use((req, res, next) => {
  res.locals.user = req.session;
  next();
});
