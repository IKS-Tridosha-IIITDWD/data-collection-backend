const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FirstQuestionnaireAnswerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  questionnaireId: {
    type: String,
    required: true,
  },
  answers: [
    {
      questionId: {
        type: String,
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      mapping: {
        type: String,
        enum: ['Vaata', 'Pitta', 'Kapha'],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('QuestionnaireOneAnswers', FirstQuestionnaireAnswerSchema);
