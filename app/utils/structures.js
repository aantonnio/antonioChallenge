const config = require('../config/config');

module.exports.responseStatus = {
  ok: 200,
  badRequest: 400,
  internal: 500,
};

module.exports.propertyNames = {
  providerName: 'providerName',
  file: 'file'
};
const _errorMessageObject = (message) => ({ message });
 
module.exports.mimeTypeNameCSV = 'csv';
module.exports.fileTypeErrorMessage = 'file property must be of type csv';
module.exports.noFileUploadErrorMessage = _errorMessageObject('must upload csv as value of the file key of the form-data request-body');
module.exports.fileIsEmptyErrorMessage = 'csv file is empty';
module.exports.noCorrectMetadataErrorMessage = _errorMessageObject('must upload valid providerName as value of the providerName key of the form-data request-body');

module.exports.getCSVTempFileName = (file) => `${Date.now()}-csv-${file.originalname}`;
module.exports.getServerStartedMessage = () => `Running at localhost:${process.env.PORT}`;
module.exports.getUploadedFilePath = (req) => config.tempFolderPath + req.file.filename;
module.exports.getCSVParsingErrorMessage = (error) => _errorMessageObject(error);
