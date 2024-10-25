const express = require('express');
const {userDemographicsController} = require('../../controllers');
const router = express.Router();

router.post('/', userDemographicsController.createUserDemographics);

router.get('/:id', userDemographicsController.getUserDemographics);

router.put('/:id', userDemographicsController.updateUserDemographics);

module.exports = router;
