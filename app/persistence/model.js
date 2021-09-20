const { Schema, model } = require('mongoose');

module.exports.getStringSchema = () => ({
  type: String
});

module.exports.getNumberSchema = () => ({
  type: Number
});

const carSchema = new Schema({
  UUID: Number,
  vin: String,
  make: String,
  model: String,
  modelCode: String,
  year: Number,
  mileage: Number,
  price: Number,
  zipCode: String,
  creationDate: String,
  updateDate: String
}, { versionKey: false });

module.exports = model('Car', carSchema);