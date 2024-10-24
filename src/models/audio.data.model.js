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
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  aa_medium_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  aa_high_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  ee_low_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  ee_medium_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  ee_high_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uu_low_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uu_medium_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uu_high_pitch: {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
};

module.exports = mongoose.model('AudioData', new Schema(audioDataSchema));
