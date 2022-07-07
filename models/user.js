const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min:4,
      max:10
    },
    name: {
      type: String,
      required: true,
      max:50
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min:6,
      max:20
    },
    interests: {
      type: Array,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    coveImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    follower: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    otherLinks: {
      type: Array,
      default: [],
    },
    sessionHistory: {
      type: Array,
      default: [],
    },
    language: {
      type: Array,
      default: [],
    },
    isMentor: {
      type: Boolean,
      default: false,
    },
    defaultImg:{
      type:String,
      default:"",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
