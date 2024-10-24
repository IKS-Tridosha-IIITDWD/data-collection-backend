const {audioDataModel} = require('../models');

async function createAudioData(audioData) {
  return await audioDataModel.create(audioData);
}

async function getAudioData(id) {
  return await audioDataModel.findOne({userId: id});
}

async function updateAudioData(id, audioData) {
  return await audioDataModel.findOneAndUpdate({userId: id}, audioData, {new: true});
}

module.exports = {
  createAudioData,
  getAudioData,
  updateAudioData,
};
