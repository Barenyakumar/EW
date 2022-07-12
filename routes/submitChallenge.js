const express = require("express")
const router = express.Router()
const ChallengeSubmition = require("../models/submitChallenge")



//create post by userid
router.post("/create", async (req, res) => {
  // const participantId = req.params.body
  try {
    const post = new ChallengeSubmition(req.body)
    // post.participantId = participantId
    const newPost = await post.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json(error)
  }
}) 


//get post by challengeId
router.get("/challenge/:id", async (req, res) => {
  try {
    const challengeId = req.params.id
    const allSubmissions = await ChallengeSubmition.find({
      challengeId
    })
    res.status(200).json(allSubmissions)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})


//get the post by submission id
router.get("/:id", async (req, res) => {
  try {
    const submission = await ChallengeSubmition.findById(req.params.id)
    res.status(200).json(submission)
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete challenge
router.delete(":id", async (req, res) => {
  try {
    await ChallengeSubmition.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "successfully deleted submission" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
