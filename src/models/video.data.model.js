const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoDataSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  face_video: {
    key: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  full_body_video: {
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

module.exports = mongoose.model('VideoData', new Schema(videoDataSchema));
