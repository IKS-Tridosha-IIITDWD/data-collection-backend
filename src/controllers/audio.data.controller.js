const {fileUploadService} = require('../microservices');
const {audioDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const readingKeys = [
  'aa_low_pitch',
  'aa_medium_pitch',
  'aa_high_pitch',
  'ee_low_pitch',
  'ee_medium_pitch',
  'ee_high_pitch',
  'uu_low_pitch',
  'uu_medium_pitch',
  'uu_high_pitch',
  'one_min_audio',
];

// Helper function to handle the upload and data update
const handleFileUploadAndUpdate = async (userId, readingFile, readingKey) => {
  const readingData = {};
  const uploadedFile = await fileUploadService.s3Upload([readingFile], readingKey);
  readingData[readingKey] = {
    key: uploadedFile[0].key,
    url: uploadedFile[0].url,
  };

  const existingReadingData = await audioDataService.getAudioData(userId);
  if (existingReadingData) {
    const oldKey = existingReadingData[readingKey]?.key;
    if (oldKey) {
      await fileUploadService
        .s3Delete(oldKey)
        .catch(() => console.log(`Failed to delete old ${readingKey} file`, oldKey));
    }
    const updatedReadingData = await audioDataService.updateAudioData(userId, readingData);
    return updatedReadingData;
  }

  const newReadingData = await audioDataService.createAudioData({userId, ...readingData});
  return newReadingData;
};

const createAudioData = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.body;
  const readingFile = req.files['file'][0];

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(201).json(readingData);
});

// Get specific reading data for a user and specific key
const getAudioData = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params;

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const readingData = await audioDataService.getAudioData(userId);
  res.status(200).json(readingData ? readingData[readingKey] : null);
});

// Update specific reading data for a given user and reading key
const updateAudioData = catchAsync(async (req, res) => {
  const {userId, readingKey} = req.params; // expect `readingKey` in the URL params
  const readingFile = req.files[readingKey][0];

  if (!readingKeys.includes(readingKey)) {
    return res.status(400).json({message: 'Invalid reading key'});
  }

  const updatedReadingData = await handleFileUploadAndUpdate(userId, readingFile, readingKey);
  res.status(200).json(updatedReadingData);
});

module.exports = {
  createAudioData,
  getAudioData,
  updateAudioData,
};
