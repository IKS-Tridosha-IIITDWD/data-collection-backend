const {questionnaireOneModel, questionnaireTwoModel} = require('../models');

async function getQuestionnaireOne() {
  return await questionnaireOneModel.findOne();
}

async function getQuestionnaireTwo() {
  return await questionnaireTwoModel.findOne();
}

module.exports = {
  getQuestionnaireOne,
  getQuestionnaireTwo,
};
