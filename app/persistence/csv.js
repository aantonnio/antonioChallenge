const dataModel = require('./model');

module.exports = async (req, res, next) => {
  const response = await dataModel.create(res.locals.csvDataForPersistence);
  console.log(response);
  res.send({ status: 200, data: response });
};