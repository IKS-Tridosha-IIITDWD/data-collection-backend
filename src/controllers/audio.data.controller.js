const {fileUploadService} = require('../microservices');
const {audioDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const audioKeys = [
  'aa_low_pitch',
  'aa_medium_pitch',
  'aa_high_pitch',
  'ee_low_pitch',
  'ee_medium_pitch',
  'ee_high_pitch',
  'uu_low_pitch',
  'uu_medium_pitch',
  'uu_high_pitch',
];

const createAudioData = catchAsync(async (req, res) => {
  const {userId} = req.body;
  const audioFiles = req.files;
  const existingAudioData = await audioDataService.getAudioData(userId);

  const audioData = {};

  for (const name in audioKeys) {
    const audioFile = await fileUploadService.s3Upload(audioFiles[name][0], name);
    audioData[name] = {
      key: audioFile[0].key,
      url: audioFile[0].url,
    };
  }

  if (existingAudioData) {
    for (const name in audioKeys) {
      const oldKey = existingAudioData[name].key;
      // eslint-disable-next-line no-unused-vars
      await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old audio file', oldKey));
      const updatedAudioData = await audioDataService.updateAudioData(userId, audioData);
      res.status(200).json(updatedAudioData);
    }
  }

  const newAudioData = await audioDataService.createAudioData(audioData);
  res.status(201).json(newAudioData);
});

const getAudioData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const audioData = await audioDataService.getAudioData(userId);
  res.status(200).json(audioData);
});

const updateAudioData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const audioFiles = req.files;
  const existingAudioData = await audioDataService.getAudioData(userId);

  const audioData = {};

  for (const name in audioKeys) {
    const audioFile = await fileUploadService.s3Upload(audioFiles[name][0], name);
    audioData[name] = {
      key: audioFile[0].key,
      url: audioFile[0].url,
    };
  }

  for (const name in audioKeys) {
    const oldKey = existingAudioData[name].key;
    // eslint-disable-next-line no-unused-vars
    await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old audio file', oldKey));
  }

  const updatedAudioData = await audioDataService.updateAudioData(userId, audioData);
  res.status(200).json(updatedAudioData);
});

module.exports = {
  createAudioData,
  getAudioData,
  updateAudioData,
};
