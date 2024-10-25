const express = require('express');
const {questionnaireOneAnswerController} = require('../../controllers');
const router = express.Router();

router.post('/', questionnaireOneAnswerController.createAnswer);

router.get('/:id', questionnaireOneAnswerController.getAnswer);

router.put('/:id', questionnaireOneAnswerController.updateAnswer);

module.exports = router;
