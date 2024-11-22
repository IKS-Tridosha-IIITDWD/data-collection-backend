const {fileUploadService} = require('../microservices');
const {videoDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const handleFileUploadAndUpdate = async (userId, readingFile, readingKey) => {
  const readingData = {};
  const uploadedFile = await fileUploadService.s3Upload([readingFile], readingKey);
  readingData[readingKey] = {
    key: uploadedFile[0].key,
    url: uploadedFile[0].url,
  };

  const existingReadingData = await videoDataService.getVideoData(userId);
  if (existingReadingData) {
    const oldKey = existingReadingData[readingKey]?.key;
    if (oldKey) {
      await fileUploadService
        .s3Delete(oldKey)
        .catch(() => console.log(`Failed to delete old ${readingKey} file`, oldKey));
    }
    const updatedReadingData = await videoDataService.updateVideoData(userId, readingData);
    return updatedReadingData;
  }

  const newReadingData = await videoDataService.createVideoData({userId, ...readingData});
  return newReadingData;
};

const createVideoData = catchAsync(async (req, res) => {
  const readingKey = 'full_body_video'; // expect `readingKey` in the URL params
  const {userId} = req.body;
  const readingFile = req.files['file'][0];

  const readingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(201).json(readingData);
});

// Get specific reading data for a user and specific key
const getVideoData = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params;

  const readingData = await videoDataService.getVideoData(userId);
  res.status(200).json(readingData ? readingData[readingKey] : null);
});

// Update specific reading data for a given user and reading key
const updateVideoData = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params; // expect `readingKey` in the URL params
  const readingFile = req.files[readingKey][0];

  const updatedReadingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(200).json(updatedReadingData);
});

module.exports = {
  createVideoData,
  getVideoData,
  updateVideoData,
};
