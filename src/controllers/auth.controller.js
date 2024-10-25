const {userDemographicsService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
  const {email} = req.body;

  const demographics = await userDemographicsService.getDemographicsByEmail(email);
  if (!demographics) {
    res.status(404).json({message: 'User not found'});
  }

  res.status(200).json(demographics);
});

module.exports = {
  login,
};
