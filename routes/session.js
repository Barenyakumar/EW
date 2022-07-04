const express = require("express")
const router = express.Router()
const Booking = require("../models/booking")
const Session = require("../models/oneSession")
var jwt = require('jsonwebtoken');
var uuid4 = require('uuid4');
const fetch = require("node-fetch");
var app_access_key = '62a5e852b873787aa2709787';
var app_secret = 'ADM7Q7WkDeJSAIvu-gijRM27381cfXsjZH_eMZjxG0XM1DlAr7kQ6X4Vyc7pgj0x2fEiNOAYBDXwe4vtmBCkFQn9diy8TArRev_Q5pQUdwqGp40tH-ORzlC7f6mNmcIWCKr1aWioVrXWJsi-teGGFfiQa6EBP9upirTEfCVpz0M=';

var jwt = require("jsonwebtoken")
var uuid4 = require("uuid4")
var app_access_key = "62a5e852b873787aa2709787"
var app_secret =
  "ADM7Q7WkDeJSAIvu-gijRM27381cfXsjZH_eMZjxG0XM1DlAr7kQ6X4Vyc7pgj0x2fEiNOAYBDXwe4vtmBCkFQn9diy8TArRev_Q5pQUdwqGp40tH-ORzlC7f6mNmcIWCKr1aWioVrXWJsi-teGGFfiQa6EBP9upirTEfCVpz0M="

router.post("/createroom", async (req, res) => {
  try {
    const response = await fetch("https://prod-in2.100ms.live/api/v2/rooms", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + req.body.token,
      },
      body: JSON.stringify({ name: req.body.name, description: req.body.description, template: req.body.template })
    });
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/token", async (req, res) => {
  try {
    jwt.sign(
      {
        access_key: app_access_key,
        type: 'management',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000)
      },
      app_secret,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
      },
      function (err, token) {
        res.status(200).json(token);
      });
  } catch (error) {
    res.status(500).json(error);
  }
})


router.get("/apptoken", async (req, res) => {
  try {
    var payload = {
      access_key: app_access_key,
      room_id: req.body.room_id,
      user_id: req.body.user_id,
      role: req.body.role,
      // above three needs to be added through body
      type: 'app',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    };

    jwt.sign(
      payload,
      app_secret,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
      },
      function (err, token) {
        res.status(200).json(token);
      }
    );
  } catch (error) {
    res.status(500).json(error)
  }
})
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


// get all upcoming group session
router.get("/activegroup", async (req, res)=>{
  try {
    const groupSessions = await Session.find({sessionType:"Group", isActive:true});
    res.status(200).json(groupSessions);
    
  } catch (error) {
    res.status(500).json(error)
  }
})
// get all past group session
router.get("/pastgroup", async (req, res)=>{
  try {
    const groupSessions = await Session.find({sessionType:"Group"});
    res.status(200).json(groupSessions);
    
  } catch (error) {
    res.status(500).json(error)
  }
})


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


// create group session route by mentor 
router.post("/:mentorId", async (req, res) => {
  const mentorID = req.params.mid
  try {
    const newSession = new Session(req.body)
    newSession.members = [mentorID, ...req.body.coHosts];
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
