const structures = require('./structures');
const logger = require('../logger/logger');
const status = structures.responseStatus;

module.exports.handleNoFileUploaded = (res) => {
  return res
    .status(status.badRequest)
    .send(structures.noFileUploadErrorMessage);
};

module.exports.handleParseCSVError = (req, res, error) => {
  return res
    .status(status.internal)
    .send({ message: error.message, status: status.internal });
};

module.exports.handleFileWasEmpty = (res) => {
  return res
    .status(status.badRequest)
    .send(structures.fileIsEmptyErrorMessage);
};

module.exports.handleNoCorrectMetadata = (res) => {
  return res
    .status(status.badRequest)
    .send(structures.noCorrectMetadataErrorMessage);
};