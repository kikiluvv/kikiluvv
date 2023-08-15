// netlify-functions/index.js
const express = require('express');
const serverless = require('serverless-http');
const app = require('../app'); // Import the modified app.js

const router = express.Router();
router.get('/', (req, res) => {
    // Handle the request using your modified Express app
    app.handle(req, res);
});

module.exports.handler = serverless(router);
