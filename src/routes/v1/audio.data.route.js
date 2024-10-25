const express = require('express');
const {fileUploadService} = require('../../microservices');
const router = express.Router();

router.post(
  '/',
  fileUploadService.multerUpload.fields([
    {name: 'aa_low_pitch', maxCount: 1},
    {name: 'aa_medium_pitch', maxCount: 1},
    {name: 'aa_high_pitch', maxCount: 1},
    {name: 'ee_low_pitch', maxCount: 1},
    {name: 'ee_medium_pitch', maxCount: 1},
    {name: 'ee_high_pitch', maxCount: 1},
    {name: 'uu_low_pitch', maxCount: 1},
    {name: 'uu_medium_pitch', maxCount: 1},
    {name: 'uu_high_pitch', maxCount: 1},
  ])
);