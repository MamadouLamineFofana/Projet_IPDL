exports.showLoginForm = (req, res) => {
    res.render('auth/login', { 
      title: 'Connexion',
      layout: 'layouts/main'
    });
  };
  
  exports.showRegisterForm = (req, res) => {
    res.render('auth/register', {
      title: 'Inscription',
      layout: 'layouts/main'
    });
  };
  
  exports.showBecomeDonor = async (req, res) => {
    if (!req.user) return res.redirect('/login');
    
    res.render('donor/become', {
      title: 'Devenir donneur',
      layout: 'layouts/main',
      user: req.user
    });
  };