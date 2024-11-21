const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioDataSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  aa_low_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  aa_medium_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  aa_high_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  ee_low_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  ee_medium_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  ee_high_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  uu_low_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  uu_medium_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  uu_high_pitch: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  one_min_audio: {
    key: {
      type: String,
    },
    url: {
      type: String,
    },
  },
};

module.exports = mongoose.model('AudioData', new Schema(audioDataSchema));
