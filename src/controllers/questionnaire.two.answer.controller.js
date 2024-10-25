const {questionnaireTwoAnswerService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const createAnswer = catchAsync(async (req, res) => {
  const answer = req.body;
  const answerExists = await questionnaireTwoAnswerService.getAnswer(answer.userId);
  if (answerExists) {
    const updatedAnswer = await questionnaireTwoAnswerService.updateAnswer(answerExists.userId, answer);
    return res.status(200).json(updatedAnswer);
  }
  const createdAnswer = await questionnaireTwoAnswerService.createAnswer(answer);
  res.status(201).json(createdAnswer);
});

const getAnswer = catchAsync(async (req, res) => {
  const {id} = req.params;
  const answer = await questionnaireTwoAnswerService.getAnswer(id);
  res.status(200).json(answer);
});

const updateAnswer = catchAsync(async (req, res) => {
  const {id} = req.params;
  const answer = req.body;
  const updatedAnswer = await questionnaireTwoAnswerService.updateAnswer(id, answer);
  res.status(200).json(updatedAnswer);
});

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
};
