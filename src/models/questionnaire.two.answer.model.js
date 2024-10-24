const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecondQuestionnaireAnswerSchema = new Schema({
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
      type: {
        type: String,
        enum: ['Vaata', 'Pitta', 'Kapha'],
      },
      answer: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('QuestionnaireTwoAnswers', SecondQuestionnaireAnswerSchema);
