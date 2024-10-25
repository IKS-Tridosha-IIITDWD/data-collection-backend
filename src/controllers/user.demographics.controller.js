const {userDemographicsService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const createUserDemographics = catchAsync(async (req, res) => {
  const user = req.body;
  const userExists = await userDemographicsService.getDemographicsByEmail(user.email);
  if (userExists) {
    const updatedUser = await userDemographicsService.updateDemographics(userExists.id, user);
    return res.status(200).json(updatedUser);
  }
  const createdUser = await userDemographicsService.createDemographics(user);
  res.status(201).json(createdUser);
});

const getUserDemographics = catchAsync(async (req, res) => {
  const {id} = req.params;
  const user = await userDemographicsService.getDemographics(id);
  res.status(200).json(user);
});

const updateUserDemographics = catchAsync(async (req, res) => {
  const {id} = req.params;
  const user = req.body;
  const updatedUser = await userDemographicsService.updateDemographics(id, user);
  res.status(200).json(updatedUser);
});

module.exports = {
  createUserDemographics,
  getUserDemographics,
  updateUserDemographics,
};
