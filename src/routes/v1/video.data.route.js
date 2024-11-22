const express = require('express');
const {fileUploadService} = require('../../microservices');
const {videoDataController} = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  videoDataController.createVideoData
);

router.get('/:id', videoDataController.getVideoData);

router.put(
  '/:id',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  videoDataController.updateVideoData
);

module.exports = router;
