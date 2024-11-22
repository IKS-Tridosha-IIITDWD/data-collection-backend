const express = require('express');
const {fileUploadService} = require('../../microservices');
const {audioDataController} = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  audioDataController.createAudioData
);

router.get('/:id', audioDataController.getAudioData);

router.put(
  '/:id',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  audioDataController.updateAudioData
);

module.exports = router;
