const {imageDataModel} = require('../models');

async function createImageData(imageData) {
  return await imageDataModel.create(imageData);
}

async function getImageData(id) {
  return await imageDataModel.findOne({userId: id});
}

async function updateImageData(id, imageData) {
  return await imageDataModel.findOneAndUpdate({userId: id}, imageData, {new: true});
}

module.exports = {
  createImageData,
  getImageData,
  updateImageData,
};
