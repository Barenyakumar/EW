const mongoose = require("mongoose")

const menteeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Mentee", menteeSchema)
