const express = require("express")
const router = express.Router()
const Booking = require("../models/booking")
const Session = require("../models/oneSession")


//create session
// router.post('/', async(req, res) => {
//   try {
//     const newSession = new Session(req.body)
//     const session = await newSession.save()
//     res.status(200).json(session)
//   } catch (err) {
//     res.status(500).json( err)
//   }
  
// })


//create session
  router.post("/:mid", async (req, res) => {
    const menteeID = req.params.mid
    try {
      const newSession = new Session(req.body)
      newSession.members.push(menteeID)
      newSession.members.push(req.body.mentor)
      const session = await newSession.save()
      res.status(200).json(session)
      // res.status(201).json(session)
    } catch (err) {
      // res.status(500).json(err)
      res.status(500).json(err)
    }

  })


  //when mentee wants to see his booking
  router.get("/:id", async (req, res) => {
    try {
      const session = await Session.findById(req.params.id)
      res.status(200).json(session)
    } catch (err) {
      res.status(500).json(err)
    }
  })



  router.delete('/:id', async (req, res) => {
    try {
      await Session.findByIdAndDelete(req.params.id)
      res.status(200).json({ msg: 'Session deleted' })
    } catch (err) {
      res.status(500).json(err)
    }
  })


module.exports = router
