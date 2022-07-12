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
      required: true,
    },
    solutionImg: {
      type: String,
      default: "",
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
