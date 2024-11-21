const {fileUploadService} = require('../microservices');
const {imageDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const readingKeys = ['face_image', 'eyes_image', 'tongue_image'];

// Helper function to handle the upload and data update
const handleFileUploadAndUpdate = async (userId, readingFile, readingKey) => {
  const readingData = {};
  const uploadedFile = await fileUploadService.s3Upload([readingFile], readingKey);
  readingData[readingKey] = {
    key: uploadedFile[0].key,
    url: uploadedFile[0].url,
  };

  const existingReadingData = await imageDataService.getImageData(userId);
  if (existingReadingData) {
    const oldKey = existingReadingData[readingKey]?.key;
    if (oldKey) {
      await fileUploadService
        .s3Delete(oldKey)
        .catch(() => console.log(`Failed to delete old ${readingKey} file`, oldKey));
    }
    const updatedReadingData = await imageDataService.updateImageData(userId, readingData);
    return updatedReadingData;
  }

  const newReadingData = await imageDataService.createImageData({userId, ...readingData});
  return newReadingData;
};

// Create reading data for a specific finger or sixty_seconds
const createReadingDataForKey = catchAsync(async (req, res) => {
  const {readingKey} = req.params; // expect `readingKey` in the URL params
  const {userId} = req.body;
  const readingFile = req.files['file'][0];

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(201).json(readingData);
});

// Get specific reading data for a user and specific key
const getReadingDataForKey = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params;

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await imageDataService.getImageData(userId);
  res.status(200).json(readingData ? readingData[readingKey] : null);
});

// Update specific reading data for a given user and reading key
const updateReadingDataForKey = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params; // expect `readingKey` in the URL params
  const readingFile = req.files[readingKey][0];

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const updatedReadingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(200).json(updatedReadingData);
});

module.exports = {
  createReadingDataForKey,
  getReadingDataForKey,
  updateReadingDataForKey,
};
