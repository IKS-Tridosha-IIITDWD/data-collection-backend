const {fileUploadService} = require('../microservices');
const {ppgReadingDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const readingKeys = ['sixtySeconds', 'indexFinger', 'middleFinger', 'ringFinger', 'littleFinger', 'thumb'];

// Helper function to handle the upload and data update
const handleFileUploadAndUpdate = async (userId, readingFile, readingKey, manual_reading) => {
  const readingData = {};
  const uploadedFile = await fileUploadService.s3Upload([readingFile], readingKey);
  readingData[readingKey] = {
    key: uploadedFile[0].key,
    url: uploadedFile[0].url,
    manual_reading,
  };

  const existingReadingData = await ppgReadingDataService.getPPGData(userId);
  if (existingReadingData) {
    const oldKey = existingReadingData[readingKey]?.key;
    if (oldKey) {
      await fileUploadService
        .s3Delete(oldKey)
        .catch(() => console.log(`Failed to delete old ${readingKey} file`, oldKey));
    }
    const updatedReadingData = await ppgReadingDataService.updatePPGData(userId, readingData);
    return updatedReadingData;
  }

  const newReadingData = await ppgReadingDataService.createPPGData({userId, ...readingData});
  return newReadingData;
};

// Create reading data for a specific finger or sixty_seconds
const createReadingDataForKey = catchAsync(async (req, res) => {
  const {readingKey} = req.params; // expect `readingKey` in the URL params
  const {userId, manual_reading} = req.body;
  const readingFile = req.files['file'][0];

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey, manual_reading);
  res.status(201).json(readingData);
});

// Get specific reading data for a user and specific key
const getReadingDataForKey = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params;

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await ppgReadingDataService.getPPGData(userId);
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
