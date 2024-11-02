const {fileUploadService} = require('../microservices');
const {videoDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const videoKeys = ['face_video', 'full_body_video'];

const createVideoData = catchAsync(async (req, res) => {
  const {userId} = req.body;
  const videoFiles = req.files;
  const existingVideoData = await videoDataService.getVideoData(userId);

  const videoData = {userId};
  // console.log(userId);
  // console.log(videoFiles);
  console.log(existingVideoData);

  for (const name of videoKeys) {
    // if (videoFiles[name] && Array.isArray(videoFiles[name][0]) && videoFiles[name]) {
    // console.log(name);
    const videoFile = await fileUploadService.s3Upload(videoFiles[name], name);
    // console.log('s3Upload function call for', name);
    // console.log(videoFile);
    videoData[name] = {
      key: videoFile[0].key,
      url: videoFile[0].url,
    };
    // } else {
    // console.log(`File not found for key: ${name}`);
    // }
  }

  if (existingVideoData) {
    for (const name of videoKeys) {
      const oldKey = existingVideoData[name].key;
      // eslint-disable-next-line no-unused-vars
      await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old video file', oldKey));
    }
    const updatedVideoData = await videoDataService.updateVideoData(userId, videoData);
    return res.status(200).json(updatedVideoData);
  }

  const newVideoData = await videoDataService.createVideoData(videoData);
  return res.status(201).json(newVideoData);
});

const getVideoData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const videoData = await videoDataService.getVideoData(userId);
  res.status(200).json(videoData);
});

const updateVideoData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const videoFiles = req.files;
  const existingVideoData = await videoDataService.getVideoData(userId);

  const videoData = {userId};

  for (const name in videoKeys) {
    const videoFile = await fileUploadService.s3Upload(videoFiles[name][0], name);
    videoData[name] = {
      key: videoFile[0].key,
      url: videoFile[0].url,
    };
  }

  for (const name in videoKeys) {
    const oldKey = existingVideoData[name].key;
    // eslint-disable-next-line no-unused-vars
    await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old video file', oldKey));
  }

  const updatedVideoData = await videoDataService.updateVideoData(userId, videoData);
  res.status(200).json(updatedVideoData);
});

module.exports = {
  createVideoData,
  getVideoData,
  updateVideoData,
};
