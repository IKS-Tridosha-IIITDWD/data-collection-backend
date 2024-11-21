const express = require('express');
const {fileUploadService} = require('../../microservices');
const {imageDataController} = require('../../controllers');
const router = express.Router();

// Create reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.post(
  '/:readingKey',
  fileUploadService.multerUpload.fields([{name: 'file', maxCount: 1}]),
  imageDataController.createReadingDataForKey
);

// Get reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.get('/:userId/:readingKey', imageDataController.getReadingDataForKey);

// Update reading data for a specific reading key (e.g., `sixty_seconds`, `index_finger`, etc.)
router.put(
  '/:userId/:readingKey',
  fileUploadService.multerUpload.single('file'),
  imageDataController.updateReadingDataForKey
);

module.exports = router;
