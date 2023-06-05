const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    mentorId: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Booking", BookingSchema)
