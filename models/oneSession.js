const mongoose = require("mongoose")

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
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    members: {
      type: [{type: mongoose.Types.ObjectId}],
      required: true,
    },
    sessionLink: {
      type: String,
      default: "",
    },
    sessionImg:{
      type:String,
      default:"",
    },
    coHosts:{
      type:Array,
      default:[]
    },
    duration:{
      type:String,
      default:"30 mins"
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Session", onesessionSchema)