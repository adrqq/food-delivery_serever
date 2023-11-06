const app = require('./app')
const port = process.env.PORT || 5000;
const https = require('https');
const fs = require('fs');

const certificate = fs.readFileSync('../certificate.crt');
const privateKey = fs.readFileSync('../private.key');

try {
  https.createServer({
    key: privateKey,
    cert: certificate,
  }, app).listen(8443);

  console.log('HTTPS server running on port 8443');
} catch (err) {
  console.log(err)
}

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (err) {
  console.log(err)
}

module.exports = app;
