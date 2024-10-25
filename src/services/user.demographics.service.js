const {userDemographicsModel} = require('../models');

async function createDemographics(user) {
  return await userDemographicsModel.create(user);
}

async function getDemographics(id) {
  return await userDemographicsModel.findById(id);
}

async function getDemographicsByEmail(email) {
  return await userDemographicsModel.findOne({email});
}

async function updateDemographics(id, user) {
  return await userDemographicsModel.findByIdAndUpdate(id, user, {new: true});
}

module.exports = {
  createDemographics,
  getDemographics,
  getDemographicsByEmail,
  updateDemographics,
};
