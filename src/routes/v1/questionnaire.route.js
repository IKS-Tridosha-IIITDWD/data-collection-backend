const express = require('express');
const {questionnaireController} = require('../../controllers');
const router = express.Router();

router.get('/one', questionnaireController.getQuestionnaireOne);

router.get('/two', questionnaireController.getQuestionnaireTwo);

module.exports = router;
