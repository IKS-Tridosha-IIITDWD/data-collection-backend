const {questionnaireOneAnswerService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const createAnswer = catchAsync(async (req, res) => {
  const answer = req.body;
  const answerExists = await questionnaireOneAnswerService.getAnswer(answer.userId);
  if (answerExists) {
    const updatedAnswer = await questionnaireOneAnswerService.updateAnswer(answerExists.userId, answer);
    return res.status(200).json(updatedAnswer);
  }
  const createdAnswer = await questionnaireOneAnswerService.createAnswer(answer);
  res.status(201).json(createdAnswer);
});

const getAnswer = catchAsync(async (req, res) => {
  const {id} = req.params;
  const answer = await questionnaireOneAnswerService.getAnswer(id);
  res.status(200).json(answer);
});

const updateAnswer = catchAsync(async (req, res) => {
  const {id} = req.params;
  const answer = req.body;
  const updatedAnswer = await questionnaireOneAnswerService.updateAnswer(id, answer);
  res.status(200).json(updatedAnswer);
});

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
};
