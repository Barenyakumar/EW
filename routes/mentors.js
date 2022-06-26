const express = require("express")
const router = express.Router()
const Mentors = require("../models/user")

//get all mentors
router.get('/mentors', async (req, res) => {
  const { username, name, isMentor, interests } = req.query
  const queryObject = {}

  if (isMentor) {
    queryObject.mentor = isMentor === 'true' ? true : false
  }
  

} )