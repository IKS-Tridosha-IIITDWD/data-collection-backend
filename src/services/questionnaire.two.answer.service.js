const {questionnaireTwoAnswerModel} = require('../models');

async function createAnswer(answer) {
  return await questionnaireTwoAnswerModel.create(answer);
}

async function getAnswer(id) {
  return await questionnaireTwoAnswerModel.findOne({userId: id});
}

async function updateAnswer(id, answer) {
  return await questionnaireTwoAnswerModel.findOneAndUpdate({userId: id}, answer, {new: true});
}

module.exports = {
  createAnswer,
  getAnswer,
  updateAnswer,
};
