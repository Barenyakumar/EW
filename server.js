const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const dotenv = require("dotenv")
const multer = require("multer")
const userAuth = require("./routes/userAuth")
const emailOtp = require("./routes/emailOtp")
const app = express()
const sessionRoutes = require("./routes/session")
const UserRoutes = require("./routes/users")
const Session = require("./models/oneSession")
// const sessionBooking = require("./routes/booking")
// const availabilityRoutes = require("./routes/availability")
// const challengeRoutes = require("./routes/challenge")
// const submitChallengeRoutes = require("./routes/submitChallenge")
// const Challenge = require("./models/challenge")
// const fetch = require("node-fetch")
// const nodemailer = require("nodemailer")
// const postRoute = require("./routes/post")

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoose.connection.on("connected", () => {
  console.log("Eduwats_DB is connected...")
})

// setting up public dir
app.use(express.static("public"))
app.use(
  "/UserImages",
  express.static(path.join(__dirname, "public/userImages"))
)

app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/userImages")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

// const upload = multer({
//     storage: storage,
//     // limits: { fileSize: 1000000 }
// });

const upload = multer({ storage })
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("initiated upload ")
  } catch (error) {
    console.log(error)
  }
})




app.use("/auth", userAuth)
app.use("/email", emailOtp)
app.use("/session", sessionRoutes)
app.use("/users", UserRoutes)
// app.use("/booking", sessionBooking)
// app.use("/availability", availabilityRoutes)
// app.use("/challenge", challengeRoutes)
// app.use("/submitchallenge", submitChallengeRoutes)
// app.use("/posts", postRoute)



// setInterval(async () => {
//   const session = await Session.find()
//   session.forEach(async (s) => {
//     const sessionDate = new Date(s.date + s.endTime)
//     // const endTime = sessionDate.getTime() + s.duration * 60000
//       // console.log(endTime)
//     //   console.log(Date.now())
//     if (sessionDate.getTime() < Date.now()) {
//       //   console.log("false")
//       s.isActive = false
//       await s.save()
//     }
//   })
// }, 1000)



if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
}

// const PORT =process.env.PORT || 9000

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT)
})
