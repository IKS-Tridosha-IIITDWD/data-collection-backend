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
      type: String,
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
      type: String,
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
      type: String,
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
      type: String,
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
      type: String,
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
      type: String,
    },
  },
});

module.exports = mongoose.model('PPGReadingData', ppgReadingDataSchema);
