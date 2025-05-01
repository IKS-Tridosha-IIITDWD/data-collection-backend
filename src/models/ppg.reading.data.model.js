const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ppgReadingDataSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  sixtySeconds: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
  indexFinger: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
  middleFinger: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
  ringFinger: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
  littleFinger: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
  thumb: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
    manual_reading: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('PPGReadingData', ppgReadingDataSchema);
