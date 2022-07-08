const mongoose = require("mongoose")

const challengeSchema = new mongoose.Schema(
  {
    mentor: {
      type: String,
      required: true,
    },
    // members: {
    //   type: Array,
    //   default: [],
    // },
    challengeName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    challengeImg: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Challenge", challengeSchema)