const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionnaireTwoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['Vaata', 'Pitta', 'Kapha'],
        required: true,
      },
      points: {
        yes: Number,
        no: Number,
      },
    },
  ],
});

module.exports = mongoose.model('QuestionnaireTwo', QuestionnaireTwoSchema);
