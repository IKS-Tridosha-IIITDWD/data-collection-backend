const QuestionnaireOneAnswers = require('../models/questionnaire.one.answer.model');
const QuestionnaireTwoAnswers = require('../models/questionnaire.two.answer.model');
const {audioDataService, videoDataService, imageDataService, ppgReadingDataService} = require('../services');

/**
 * Determines the constitution class based on percentages
 * @param {Object} percentages - Object containing percentages for Vaata, Pitta, and Kapha
 * @returns {String} - The constitution class
 */
const determineConstitutionClass = percentages => {
  const threshold = 30; // Threshold percentage to consider a dosha significant
  const dominantDoshas = [];

  if (percentages.Vaata >= threshold) dominantDoshas.push('Vaata');
  if (percentages.Pitta >= threshold) dominantDoshas.push('Pitta');
  if (percentages.Kapha >= threshold) dominantDoshas.push('Kapha');

  if (dominantDoshas.length === 0) {
    return 'Vaata-Pitta-Kapha'; // Balanced constitution
  }

  return dominantDoshas.join('-');
};

/**
 * Validate if user has provided all required data
 * @param {string} userId - The user ID to check
 * @returns {Promise<{isComplete: boolean, missingData: string[]}>} - Result with completion status and missing data
 */
const validateUserDataCompleteness = async userId => {
  const missingData = [];

  // Check questionnaire one answers
  const questionnaireOneAnswers = await QuestionnaireOneAnswers.findOne({userId});
  if (!questionnaireOneAnswers) {
    missingData.push('First questionnaire');
  }

  // Check questionnaire two answers
  const questionnaireTwoAnswers = await QuestionnaireTwoAnswers.findOne({userId});
  if (!questionnaireTwoAnswers) {
    missingData.push('Second questionnaire');
  }

  // Check audio data
  const audioData = await audioDataService.getAudioData(userId);
  if (!audioData) {
    missingData.push('Audio recordings');
  }

  // Check video data
  const videoData = await videoDataService.getVideoData(userId);
  if (!videoData) {
    missingData.push('Video recordings');
  }

  // Check image data
  const imageData = await imageDataService.getImageData(userId);
  if (!imageData) {
    missingData.push('Images (face, eyes, tongue)');
  }

  // Check PPG reading data
  const ppgData = await ppgReadingDataService.getPPGData(userId);
  if (!ppgData) {
    missingData.push('PPG readings');
  }

  return {
    isComplete: missingData.length === 0,
    missingData,
  };
};

/**
 * Get analysis for a user based on questionnaire answers
 */
exports.getUserAnalysis = async (req, res) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({message: 'User ID is required'});
    }

    // Check if all required data is present
    const {isComplete, missingData} = await validateUserDataCompleteness(userId);

    if (!isComplete) {
      return res.status(400).json({
        message: 'Analysis cannot be generated. User has not provided all required data.',
        missingData: missingData,
      });
    }

    // Fetch questionnaire answers for the user
    const questionnaireOneAnswers = await QuestionnaireOneAnswers.findOne({userId});
    const questionnaireTwoAnswers = await QuestionnaireTwoAnswers.findOne({userId});

    // Initialize dosha counts
    const doshaCount = {
      Vaata: 0,
      Pitta: 0,
      Kapha: 0,
      total: 0,
    };

    // Count from questionnaire one
    questionnaireOneAnswers.answers.forEach(answer => {
      doshaCount[answer.mapping]++;
      doshaCount.total++;
    });

    // Count from questionnaire two
    questionnaireTwoAnswers.answers.forEach(answer => {
      // Only count "Yes" answers in questionnaire two
      if (answer.answer === 'Yes') {
        doshaCount[answer.type] += answer.points;
        doshaCount.total += answer.points;
      }
    });

    // Calculate percentages
    const percentages = {
      Vaata: Math.round((doshaCount.Vaata / doshaCount.total) * 100),
      Pitta: Math.round((doshaCount.Pitta / doshaCount.total) * 100),
      Kapha: Math.round((doshaCount.Kapha / doshaCount.total) * 100),
    };

    // Determine constitution class
    const constitutionClass = determineConstitutionClass(percentages);

    return res.status(200).json({
      doshaCount,
      percentages,
      constitutionClass,
    });
  } catch (error) {
    console.error('Error in analysis:', error);
    return res.status(500).json({message: 'Internal server error', error: error.message});
  }
};
