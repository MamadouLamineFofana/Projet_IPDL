exports.ensureAdmin = (req, res, next) => {
    if (req.session.role === "admin") {
      next();
    } else {
      res.status(403).render("error", { errorCode: 403, message: "Accès interdit" });
    }
};
