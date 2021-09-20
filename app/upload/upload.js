const config = require('../config/config');
const multer = require('multer');
const validate = require('../utils/validate');
const structures = require('../utils/structures');

module.exports.filenameForCSV = (request, file, callback) => {
  callback(null, structures.getCSVTempFileName(file));
};

module.exports.destinationForCSV = (request, file, callback) => {
  callback(null, config.tempFolderPath);
};

module.exports.fileFilterForCSV = (request, file, callback) => {
  if (!validate.doesRequestFileIncludeCSV(file))
    return callback(structures.fileTypeErrorMessage, false);
  callback(null, true);
};

const storage = multer.diskStorage({
  destination: this.destinationForCSV,
  filename: this.filenameForCSV
});

const uploadCSV = multer({
  storage,
  fileFilter: this.fileFilterForCSV
});

module.exports.upload = uploadCSV.single(structures.propertyNames.file);
module.exports = (req, res, next) => { 
  this.upload(req, res, (error, result) => {
    if(error) 
      return res.status(400).send({ status: 400, message: error })
    next();
  });
};