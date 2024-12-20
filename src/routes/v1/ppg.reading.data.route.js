const express = require('express');
const {fileUploadService} = require('../../microservices');
const {ppgReadingDataController} = require('../../controllers');
const router = express.Router();

// Create reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.post(
  '/user/:readingKey',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  ppgReadingDataController.createReadingDataForKey
);

// Get reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.get('/:userId/:readingKey', ppgReadingDataController.getReadingDataForKey);

// Update reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.put(
  '/:userId/:readingKey',
  fileUploadService.multerUpload.single('file'),
  ppgReadingDataController.updateReadingDataForKey
);

module.exports = router;
