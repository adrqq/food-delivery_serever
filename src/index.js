const express = require('express');
require('dotenv').config()

// const functions = require('firebase-functions');
const app = require('./app')
const port = process.env.PORT || '5000';

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (err) {
  console.log(err)
}

// exports.api = functions.https.onRequest(app)
module.exports = app;
