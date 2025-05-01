const QuestionnaireOneAnswers = require('../models/questionnaire.one.answer.model');
const QuestionnaireTwoAnswers = require('../models/questionnaire.two.answer.model');

/**
 * Determines the constitution class based on percentages
 * @param {Object} percentages - Object containing percentages for Vaata, Pitta, and Kapha
 * @returns {String} - The constitution class
 */
const determineConstitutionClass = (percentages) => {
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
 * Get analysis for a user based on questionnaire answers
 */
exports.getUserAnalysis = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Fetch questionnaire answers for the user
    const questionnaireOneAnswers = await QuestionnaireOneAnswers.findOne({ userId });
    const questionnaireTwoAnswers = await QuestionnaireTwoAnswers.findOne({ userId });
    
    if (!questionnaireOneAnswers && !questionnaireTwoAnswers) {
      return res.status(404).json({ 
        message: 'Analysis cannot be generated. User has not completed any questionnaires.' 
      });
    }
    
    // Initialize dosha counts
    const doshaCount = {
      Vaata: 0,
      Pitta: 0,
      Kapha: 0,
      total: 0
    };
    
    // Count from questionnaire one if available
    if (questionnaireOneAnswers) {
      questionnaireOneAnswers.answers.forEach(answer => {
        doshaCount[answer.mapping]++;
        doshaCount.total++;
      });
    }
    
    // Count from questionnaire two if available
    if (questionnaireTwoAnswers) {
      questionnaireTwoAnswers.answers.forEach(answer => {
        // Only count "Yes" answers in questionnaire two
        if (answer.answer === 'Yes') {
          doshaCount[answer.type] += answer.points;
          doshaCount.total += answer.points;
        }
      });
    }
    
    // Check if we have any data to analyze
    if (doshaCount.total === 0) {
      return res.status(404).json({ 
        message: 'Analysis cannot be generated. No valid answers found in questionnaires.' 
      });
    }
    
    // Calculate percentages
    const percentages = {
      Vaata: Math.round((doshaCount.Vaata / doshaCount.total) * 100),
      Pitta: Math.round((doshaCount.Pitta / doshaCount.total) * 100),
      Kapha: Math.round((doshaCount.Kapha / doshaCount.total) * 100)
    };
    
    // Determine constitution class
    const constitutionClass = determineConstitutionClass(percentages);
    
    return res.status(200).json({
      doshaCount,
      percentages,
      constitutionClass
    });
    
  } catch (error) {
    console.error('Error in analysis:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
