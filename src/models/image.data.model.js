const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageDataSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  face_image: {
    key: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  eyes_image: {
    key: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  tongue_image: {
    key: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
};

module.exports = mongoose.model('ImageData', new Schema(imageDataSchema));
