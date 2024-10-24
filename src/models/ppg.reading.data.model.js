const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ppgReadingDataSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  sixty_seconds: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  index_finger: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  middle_finger: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  ring_finger: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  little_finger: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  thumb: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('PPGReadingData', ppgReadingDataSchema);
