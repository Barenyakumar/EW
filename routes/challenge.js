const express = require("express")
const router = express.Router()
const Challenge = require("../models/challenge")


//get all active challenges
router.get('/activeChallenges', async (req, res) => { 
  try {
    const activeChallenges = await Challenge.find({ isActive: true })
    res.status(200).json(activeChallenges)
    console.log(res.data)
  } catch (err) { 
    res.status(500).json(err)
  }
})

//get all past challenges
router.get('/pastChallenges', async (req, res) => { 
  try {
    const activeChallenges = await Challenge.find({ isActive: false })
    res.status(200).json(activeChallenges)
  } catch (err) { 
    res.status(500).json(err)
  }
})


//get challenge by id
router.get('/:id', async (req, res) => {
  try {
   
    const challenge = await Challenge.findById(req.params.id)
    res.status(200).json(challenge)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

//get all challenges by mentorId 
router.get("/mentor/:id", async (req, res) => {
  try {
    const mentor = req.params.id
    const challenge = await Challenge.find({mentor})
    res.status(200).json(challenge)
    // console.log(res.data)
  } catch (err) {
    res.status(500).json(err)
  }
})


//create a new challenge by mentor
router.post("/create/:id", async (req, res) => {
  const mentorId = req.params.id
  try {
    const challenge = new Challenge(req.body)
    challenge.mentor = mentorId
    // challenge.members.push(mentorId)
    const newChallenge = await challenge.save()
    // console.log(req.body)
    res.status(200).json(newChallenge)
  } catch (err) {
    res.status(500).json(err)
  }
})





//update challenge
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const challenge = await Challenge.findById(req.params.id)
      const {
        challengeName,
        category,
        endDate,
        endTime,
        description,
        challengeImg,
      } = req.body
      if (challengeName) Challenge.challengeName = challengeName
      if (category !== undefined) Challenge.category = category
      if (endDate !== undefined) Challenge.endDate = endDate
      if (endTime !== undefined) Challenge.endTime = endTime
      if (description !== undefined) Challenge.description = description
      if (challengeImg !== undefined) Challenge.challengeImg = challengeImg
      await challenge.save()
      const { updatedAt, createdAt, isAdmin, ...other } = challenge._doc
      res.status(200).json({ msg: "Account successfully updated", user: other })
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    return res.status(403).json("Invalid User ID")
  }
})


router.delete("/:id", async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "successfully deleted challenge" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
