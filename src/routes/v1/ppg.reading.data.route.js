const express = require('express');
const {fileUploadService} = require('../../microservices');
const {ppgReadingDataController} = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  fileUploadService.multerUpload.fields([
    {name: 'sixty_seconds', maxCount: 1},
    {name: 'index_finger', maxCount: 1},
    {name: 'middle_finger', maxCount: 1},
    {name: 'ring_finger', maxCount: 1},
    {name: 'little_finger', maxCount: 1},
    {name: 'thumb', maxCount: 1},
  ]),
  ppgReadingDataController.createReadingData
);

router.get('/:id', ppgReadingDataController.getReadingData);

router.put(
  '/:id',
  fileUploadService.multerUpload.fields([
    {name: 'sixty_seconds', maxCount: 1},
    {name: 'index_finger', maxCount: 1},
    {name: 'middle_finger', maxCount: 1},
    {name: 'ring_finger', maxCount: 1},
    {name: 'little_finger', maxCount: 1},
    {name: 'thumb', maxCount: 1},
  ]),
  ppgReadingDataController.updateReadingData
);

module.exports = router;
