const {fileUploadService} = require('../microservices');
const {ppgReadingDataService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const readingKeys = ['sixty_seconds', 'index_finger', 'middle_finger', 'ring_finger', 'little_finger', 'thumb'];

const createReadingData = catchAsync(async (req, res) => {
  const {userId} = req.body;
  const readingFiles = req.files;
  const existingReadingData = await ppgReadingDataService.getPPGData(userId);

  const readingData = {};

  for (const name in readingKeys) {
    const readingFile = await fileUploadService.s3Upload(readingFiles[name][0], name);
    readingData[name] = {
      key: readingFile[0].key,
      url: readingFile[0].url,
    };
  }

  if (existingReadingData) {
    for (const name in readingKeys) {
      const oldKey = existingReadingData[name].key;
      // eslint-disable-next-line no-unused-vars
      await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old reading file', oldKey));
      const updatedReadingData = await ppgReadingDataService.updatePPGData(userId, readingData);
      res.status(200).json(updatedReadingData);
    }
  }

  const newReadingData = await ppgReadingDataService.createPPGData(readingData);
  res.status(201).json(newReadingData);
});

const getReadingData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const readingData = await ppgReadingDataService.getPPGData(userId);
  res.status(200).json(readingData);
});

const updateReadingData = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const readingFiles = req.files;
  const existingReadingData = await ppgReadingDataService.getPPGData(userId);

  const readingData = {};

  for (const name in readingKeys) {
    const readingFile = await fileUploadService.s3Upload(readingFiles[name][0], name);
    readingData[name] = {
      key: readingFile[0].key,
      url: readingFile[0].url,
    };
  }

  if (existingReadingData) {
    for (const name in readingKeys) {
      const oldKey = existingReadingData[name].key;
      // eslint-disable-next-line no-unused-vars
      await fileUploadService.s3Delete(oldKey).catch(err => console.log('Failed to delete old reading file', oldKey));
      const updatedReadingData = await ppgReadingDataService.updatePPGData(userId, readingData);
      res.status(200).json(updatedReadingData);
    }
  }

  const newReadingData = await ppgReadingDataService.createPPGData(readingData);
  res.status(201).json(newReadingData);
});

module.exports = {
  createReadingData,
  getReadingData,
  updateReadingData,
};
