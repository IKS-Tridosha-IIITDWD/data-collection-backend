const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionnaireOneSchema = new Schema({
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
      options: [
        {
          optionText: {
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
    },
  ],
});

module.exports = mongoose.model('QuestionnaireOne', QuestionnaireOneSchema);
