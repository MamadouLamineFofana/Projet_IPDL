const http = require('http');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status-codes');
const port = 3000;

// Types MIME pour les différents fichiers
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif'
};

// Fonction pour servir un fichier
const serveFile = (filePath, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(httpStatus.INTERNAL_SERVER_ERROR);
      res.end('Erreur lors de la lecture du fichier');
      return;
    }
    
    const extension = path.extname(filePath);
    const contentType = contentTypes[extension] || 'text/plain';   
    res.writeHead(httpStatus.OK, {
      'Content-Type': contentType
    });
    
    res.end(data);
  });
};

// Gérer les requêtes
const handleRequest = (req, res) => {
  let url = req.url;

  // Pages principales
  if (url === '/') {
    serveFile('./views/index.html', res);
    return;
  }

  if (url === '/login') {
    serveFile('./views/login.html', res);
    return;
  }

  if (url === '/register') {
    serveFile('./views/register.html', res);
    return;
  }

  if (url === '/campaigns') {
    serveFile('./views/campaigns.html', res);
    return;
  }

  // Pages admin
  if (url === '/admin') {
    serveFile('./views/admin/dashboard.html', res);
    return;
  }

  if (url === '/admin/create-campaign') {
    serveFile('./views/admin/create-campaign.html', res);
    return;
  }

  if (url === '/admin/statistics') {
    serveFile('./views/admin/statistics.html', res);
    return;
  }

  // Fichiers statiques
  if (url.match(/^\/(css|js|images)\//)) {
    const filePath = `./public${url}`;
    
    fs.access(filePath, fs.constants.F_OK, (error) => {
      if (error) {
        res.writeHead(httpStatus.NOT_FOUND);
        res.end('Fichier non trouvé');
        return;
      }
      
      serveFile(filePath, res);
    });
    return;
  }

  // Erreur 404
  serveFile('./views/error.html', res);
};

const app = http.createServer(handleRequest);
app.listen(port);
console.log(`Serveur démarré sur le port: ${port}`);