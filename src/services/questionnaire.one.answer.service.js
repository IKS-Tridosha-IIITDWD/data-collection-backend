const {questionnaireOneAnswerModel} = require('../models');

async function createAnswer(answer) {
  return await questionnaireOneAnswerModel.create(answer);
}

async function getAnswer(id) {
  return await questionnaireOneAnswerModel.findOne({userId: id});
}

async function updateAnswer(id, answer) {
  return await questionnaireOneAnswerModel.findOneAndUpdate({userId: id}, answer, {new: true});
}

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
};
