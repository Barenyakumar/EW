const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')

// search User
router.get('/search', async (req, res) => {
  const { s, isMentor } = req.query;
  try {
    let queryObject = {};
    if (isMentor) {
      queryObject.isMentor = isMentor
    }
    queryObject.username = { $regex: s, $options: "i" }
    let result1 = await User.find(queryObject)
    queryObject = {}
    if (isMentor) {
      queryObject.isMentor = isMentor
    }
    queryObject.name = { $regex: s, $options: "i" }
    let result2 = await User.find(queryObject)
    let user = [ ...result1]
    result2.forEach(elem=>{
      if(!result1.includes(elem)){
        user.concat([elem])
      }
    })
    if (user.length > 1)
      res.status(200).json(user)
    else
      res.status(200).json(["No user found. Try again... !!!"])
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong!!!" })
  }
})



// get user
router.get("/", async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await User.findById(req.query.userId)
      : await User.findOne({ username: username })

    // This is how we can filter data to be viwed form mongodb document.
    const { password, updatedAt, createdAt, isAdmin, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all users
router.get("/all", async (req, res) => {
  try {
    const user = await User.find()
    const result = []
    user.forEach((element, index) => {
      result[index] = {
        Name: element.name,
        id: element._id,
        username: element.username,
        email: element.email
      }
    })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
})


router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    try {
      const user = await User.findById(req.params.id)
      const { name, lOne, lTwo, lThree, iOne, iTwo, iThree, bio, linkedIn } =
        req.body

      if (name) {
        user.name = name
      }

      var dummyArray = []
      if (lOne !== undefined) dummyArray.push(lOne)
      if (lTwo !== undefined) dummyArray.push(lTwo)
      if (lThree !== undefined) dummyArray.push(lThree)

      if (dummyArray.length !== 0) user.language = dummyArray.concat()

      dummyArray = []
      if (iOne !== undefined) dummyArray.push(iOne)
      if (iTwo !== undefined) dummyArray.push(iTwo)
      if (iThree !== undefined) dummyArray.push(iThree)

      if (dummyArray.length !== 0) user.interests = dummyArray.concat()

      if (bio !== undefined) user.bio = bio

      if (linkedIn !== undefined) user.otherLinks.push(linkedIn)

      await user.save()

      const sendUser = { ...user }
      delete sendUser["password"]
      delete sendUser["updatedAt"]
      res
        .status(200)
        .json({ msg: "Account successfully updated", user: sendUser._doc })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json("Invalid User ID")
  }
})

//updatePassword
router.post("/:id/updatepassword", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id)
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
      res.status(200).send("password updated")
      await user.save()
    } catch (e) {
      return res.status(500).json(error)
    }
  }
})
router.post("/:id/updatemail", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id)
      let flag =await bcrypt.compare(req.body.password, user.password)
      if(flag){
        user.email = req.body.email;
      await user.save()

      res.status(200).send("Email updated")

      }
      else
        res.status(200).json("wrong password")
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  else{
    res.status(200).json("not a user")
  }
})

//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.bodyIsAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been deleted successfully")
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json("Invalid User ID")
  }
})

//getUser
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    return res.status(500).json(error)
  }
})

//search user

// router.get("/find", async (req, res) => {
//   const s = req.query.s
//   const isMentor = req.query.isMentor
//   try {
//     // const user = userId
//     //   ? await User.findById(req.query.userId)
//     //   : await User.findOne({ username: username })

//     // // This is how we can filter data to be viwed form mongodb document.
//     // const { password, updatedAt, createdAt, isAdmin, ...other } = user._doc
//     res.status(200).json(s)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

// 


module.exports = router
