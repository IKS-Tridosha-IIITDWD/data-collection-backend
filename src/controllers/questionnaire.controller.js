const {questionnaireService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const getQuestionnaireOne = catchAsync(async (req, res) => {
  const questionnaire = await questionnaireService.getQuestionnaireOne();
  res.status(200).json(questionnaire);
});

const getQuestionnaireTwo = catchAsync(async (req, res) => {
  const questionnaire = await questionnaireService.getQuestionnaireTwo();
  res.status(200).json(questionnaire);
});

module.exports = {
  getQuestionnaireOne,
  getQuestionnaireTwo,
};
