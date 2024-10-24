const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemographicsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
});

module.exports = mongoose.model('Demographics', DemographicsSchema);
