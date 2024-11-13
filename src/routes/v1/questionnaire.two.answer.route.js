const express = require('express');
const {questionnaireTwoAnswerController} = require('../../controllers');
const router = express.Router();

router.post('/', questionnaireTwoAnswerController.createAnswer);

router.get('/:id', questionnaireTwoAnswerController.getAnswer);

router.put('/:id', questionnaireTwoAnswerController.updateAnswer);

module.exports = router;
