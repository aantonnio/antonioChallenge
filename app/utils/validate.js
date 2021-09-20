const structures = require('./structures');

module.exports.doesRequestFileIncludeCSV = (file) => {
  return file.mimetype.includes(structures.mimeTypeNameCSV);
};

module.exports.hasFileNotBeenUploaded = (req) => {
 return req.file ? false : true;
};

module.exports.doesRequestHaveIncorrectCorrectMetadata = (request) => {
  return request.body.providerName || (request.body.providerName === '')? false : true;
};