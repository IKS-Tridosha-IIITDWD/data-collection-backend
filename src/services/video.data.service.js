const {videoDataModel} = require('../models');

async function createVideoData(videoData) {
  return await videoDataModel.create(videoData);
}

async function getVideoData(id) {
  return await videoDataModel.findOne({userId: id});
}

async function updateVideoData(id, videoData) {
  return await videoDataModel.findOneAndUpdate({userId: id}, videoData, {new: true});
}

module.exports = {
  createVideoData,
  getVideoData,
  updateVideoData,
};
