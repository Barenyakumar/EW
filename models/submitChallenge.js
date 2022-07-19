const mongoose = require("mongoose")

const ChallengeSubmitionSchema = new mongoose.Schema(
  {
    challengeId: {
      type: String,
      required: true,
    },
    participantId: {
      type: String,
      required: true,
    },
    // solutionFormat: {
    //   type: String,
    //   required: true,
    // },
    solutionDesc: {
      type: String,
      default: "",
    },
    solutionImg: {
      type: String,
      required: true,
    },
    // solutionVideo: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("ChallengeSubmition", ChallengeSubmitionSchema)
