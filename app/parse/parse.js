const csv = require("fast-csv");
const fs = require("fs");
const config = require('../config/config');
const validate = require('../utils/validate');
const structures = require('../utils/structures');
const responses = require('../utils/responses');
const dataModel = require('../persistence/model');

module.exports.parseCSV = (req, res, next) => {
  try {

    if (validate.hasFileNotBeenUploaded(req))
      return responses.handleNoFileUploaded(res);
      
    if (validate.doesRequestHaveIncorrectCorrectMetadata(req))
      return responses.handleNoCorrectMetadata(res);

    this.executeParse(req, res, next);

  } catch (error) {
    return responses.handleParseCSVError(req, res, error);
  }
};

module.exports.executeParse = (req, res, next) => {
  const path = structures.getUploadedFilePath(req);
  res.locals.csvDataForPersistence = [];
  fs.createReadStream(path)
    .pipe(this.parse())
    .on('data', (element) => {
      if(!(Object.keys(element).length === 0)) {
        res.locals.csvDataForPersistence.push(element);
      }
    })
    .on('error', error => res.status(500).send(error))
    .on('end', () => {
      if (!res.locals.csvDataForPersistence.length) 
        return responses.handleFileWasEmpty(res);
      else {
        fs.unlink(path,() => next());
      }
    });
};

module.exports.parse = () => {
  return csv
    .parse({ 
      headers: this.filterHeaders,
      ignoreEmpty: true,
      discardUnmappedColumns: true
    })
    .transform(element => this.transform(element));
};

module.exports.transform = (element) => ({
  ...element.uuid && { UUID: parseInt(element.uuid) },
  ...element.vin && { vin: element.vin },
  ...element.make && { make: element.make },
  ...element.model && { model: element.model },
  ...element.modelcode && { modelCode: element.modelcode },
  ...element.year && { year: parseInt(element.year) },
  ...element.mileage && { mileage: parseInt(element.mileage) },
  ...element.price && { price: parseInt(element.price) },
  ...element.zipcode && { zipCode: element.zipcode },
  ...element.creationdate && { creationDate: element.creationdate },
  ...element.updatedate && { updateDate: element.updatedate },
});

module.exports.filterHeaders = (headers) => {
  return headers
    .map(header => this.homogenizeHeader(header))
    .map(header => this.filterHeaderIfRequired(header));
};

module.exports.homogenizeHeader = (header) => {
  return header.toLowerCase().replace(/_/g, '');
};

module.exports.filterHeaderIfRequired = (header) => {
  const requiredHeaders = config.csvTypes.baseline;
  if(requiredHeaders.find(required => required === header)) {
    return header;
  } else {
    return undefined;
  }
};

module.exports = this.parseCSV;