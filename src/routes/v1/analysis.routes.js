const express = require('express');
const router = express.Router();
const analysisController = require('../../controllers/analysis.controller');

// Get user analysis
router.post('/user-analysis', analysisController.getUserAnalysis);

module.exports = router;
