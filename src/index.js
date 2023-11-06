const app = require('./app')
const port = process.env.PORT || 5000;

const certificate = fs.readFileSync('../certificate.crt');
const privateKey = fs.readFileSync('../private.key');

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (err) {
  console.log(err)
}

try {
  https.createServer({
    key: privateKey,
    cert: certificate,
  }, app).listen(8443);
} catch (err) {
  console.log(err)
}

module.exports = app;
