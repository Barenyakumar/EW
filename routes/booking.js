
const router = require("express").Router()
const Booking = require("../models/booking")

router.post("/", async (req, res) => {
  const { sessionId, mentorId } = req.body
  try {
    const booking = new Booking({ sessionId, mentorId })
    const newBooking = await booking.save()
    res.status(201).json(newBooking)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const mentorId = req.params.id
    const booking = await Booking.find({ mentorId })
    res.status(200).json(booking)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put("/:id", async (req, res) => {
  try {
    let booking =await Booking.findById(req.params.id);
    booking.isApproved = true;
    await booking.save()
    res.status(200).json(booking)
  } catch (err) {
    res.status(500).send(err)
  }
})
// router.put("/:id", async (req, res) => {
//     const bookingId = req.params.id
//     const booking = Booking.findByIdAndUpdate(bookingId,isApproved= false,function (err, result){
//         if(err)
//             res.status(500).json(err)
//         else
//             res.status(200).json(result);
//     })
//     // await booking.save()
//     // res.status(200).send({msg:"booking approved"})

// })

// Delete a booking
router.delete("/:id/delete", async (req, res) => {
  try {
    const sessionId = req.params.id
    const booking = Booking.deleteOne({ sessionId })
    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router