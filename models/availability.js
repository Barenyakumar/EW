const mongoose = require("mongoose")

const AvailabilitySchema = new mongoose.Schema(
  {
    mentorId: {
      type:mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: Array, //take starttime in gap of 30 mins as default
      required: true,
    },
    endTime: {
      type: Array, //take starttime in gap of 30 mins as default
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Availability", AvailabilitySchema)