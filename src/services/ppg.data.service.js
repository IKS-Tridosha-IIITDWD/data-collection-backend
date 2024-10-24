const {ppgReadingDataModel} = require('../models');

async function createPPGData(ppgData) {
  return await ppgReadingDataModel.create(ppgData);
}

async function getPPGData(id) {
  return await ppgReadingDataModel.findOne({userId: id});
}

async function updatePPGData(id, ppgData) {
  return await ppgReadingDataModel.findOneAndUpdate({userId: id}, ppgData, {new: true});
}

module.exports = {
  createPPGData,
  getPPGData,
  updatePPGData,
};
