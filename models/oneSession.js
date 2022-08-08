const mongoose = require("mongoose")

//oneSession is for both one-oneSession and group session
const onesessionSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sessionName: {
      type: String,
      required: true,
    },
    sessionType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    members: {
      type: [{ type: mongoose.Types.ObjectId }],
      default: [],
    },
    sessionLink: {
      type: String,
      default: "",
    },
    sessionImg: {
      type: String,
      default: "",
    },
    coHosts: {
      type: Array,
      default: [],
    },
    duration: {
      type: String,
      default: "30 mins",
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

module.exports = mongoose.model("Session", onesessionSchema)
