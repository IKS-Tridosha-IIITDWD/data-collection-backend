const express = require('express');
const router = express.Router();

const questionnaireRoute = require('./questionnaire.route');
const questionnaireOneAnswerRoute = require('./questionnaire.one.answer.route');
const questionnaireTwoAnswerRoute = require('./questionnaire.two.answer.route');
const userDemographicsRoute = require('./user.demographics.route');
const audioDataRoute = require('./audio.data.route');
const ppgReadingDataRoute = require('./ppg.reading.data.route');
const authRoute = require('./auth.route');
const imageRoute = require('./image.data.route');
const videoRoute = require('./video.data.route');

router.get('/status', (req, res) => res.send('OK'));
router.use('/questionnaire', questionnaireRoute);
router.use('/questionnaire-one-answer', questionnaireOneAnswerRoute);
router.use('/questionnaire-two-answer', questionnaireTwoAnswerRoute);
router.use('/user-demographics', userDemographicsRoute);
router.use('/audio', audioDataRoute);
router.use('/ppg', ppgReadingDataRoute);
router.use('/auth', authRoute);
router.use('/image', imageRoute);
router.use('/video', videoRoute);

module.exports = router;
