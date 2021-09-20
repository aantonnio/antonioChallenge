const columns = {
  uuid: 'uuid',
  vin: 'vin',
  make: 'make',
  model: 'model',
  mileage: 'mileage',
  year: 'year',
  price: 'price',
  zipcode: 'zipcode',
  createDate: 'creationdate',
  updateDate: 'updatedate',
  modelCode: 'modelcode',
  year: 'year',
};

const CONFIG_OBJECT = {
  tempFolderPath: './app/temp/',
  csvTypes: {
    baseline: [
      columns.uuid,
      columns.vin,
      columns.make,
      columns.model,
      columns.mileage,
      columns.year,
      columns.price,
      columns.zipcode,
      columns.createDate,
      columns.updateDate,
      columns.modelCode,
      columns.year
    ]
  }
};

module.exports = CONFIG_OBJECT;