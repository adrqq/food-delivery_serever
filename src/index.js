const app = require('./app')
const port = process.env.PORT || 5000;

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (err) {
  console.log(err)
}

module.exports = app;
