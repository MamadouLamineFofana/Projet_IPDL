exports.pageNotFoundError = (req, res) => {
    res.status(404).render("error", { pageTitle: "Erreur 404", errorCode: 404, message: "Page non trouvée" });
  };
  
  exports.internalServerError = (err, req, res, next) => {
    console.error(err);
    res.status(500).render("error", { pageTitle: "Erreur 500", errorCode: 500, message: "Erreur interne du serveur" });
  };
  