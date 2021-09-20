require('dotenv').config();
const axios = require('axios');
const fixtures = require('../fixtures');
const FormData = require('form-data');
const fs = require('fs');

module.exports.subject = async (filePath, apiPath, providerName) => {
  let formRequest = this.getRequestObject(filePath, providerName);
  return this.callAPI(formRequest, apiPath);
};

module.exports.uploadCSVSubject = async (csvSubject, providerName) => {
  return this.subject(
    this.getFilePathFromCsvSubject(csvSubject),
    process.env.API_PATH,
    providerName
  );
};

module.exports.uploadCSVSubjectWithProviderName = async (csvSubject) => {
  return this.subject(
    this.getFilePathFromCsvSubject(csvSubject),
    process.env.API_PATH,
    'someProviderName'
  );
};

module.exports.getFilePathFromCsvSubject = (csvSubject) => {
  return `./test/fixtures/csv/${csvSubject}.csv`;
};

module.exports.getRequestObject = (filePath, providerName) => {
  let request = new FormData();
  request.append(fixtures.propertyNames.providerName, providerName);
  request.append(fixtures.propertyNames.file, fs.createReadStream(filePath));
  return request;
};

module.exports.callAPI = async (formData, apiPath) => {
  return axios({
    method: 'post',
    url: process.env.API_BASE_URL + apiPath,
    headers: { 
      ...formData.getHeaders()
    },
    data : formData
  });
};


