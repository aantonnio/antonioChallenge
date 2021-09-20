require('dotenv').config();
const express = require('express');
const uploadCSV = require('../upload/upload');
const parseCSV = require('../parse/parse');
const persistCSV = require('../persistence/csv');

module.exports = (app) => {
  let router = express.Router();

  router.use(express.urlencoded({ extended: true }));
  router.post('/', uploadCSV, parseCSV, persistCSV);

  app.use(process.env.API_PATH, router);
};
