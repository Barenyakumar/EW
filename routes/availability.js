const express = require("express")
const router = express.Router()
const Availability = require("../models/availability")



router.post("/", async (req, res) => {
  const mentorId = req.body.mentorId;
  try {
    const availableObj = await Availability.find({ mentorId })
    availableObj.forEach((element) => {
      if (element.date === req.body.date) {
        throw { code: "element_matched", data: element }
      }
    });
    throw "not_an_element"
  }
  catch (error) {
    if (typeof error == 'object' && error.code == "element_matched") {
      async function updateEntry(element) {
        element.date = req.body.date
        element.startTime = [...req.body.startTime]
        element.endTime = [...req.body.endTime]

        await element.save();
        res.status(200).json(element)
      }

      updateEntry(error.data)
    }
    else if (error == "not_an_element") {
      async function createEntry() {
        const newAvailability = new Availability({
          mentorId: req.body.mentorId,
          date: req.body.date,
          startTime: req.body.startTime,
          endTime: req.body.endTime
        })
        //save the availability
        const availability = await newAvailability.save()
        res.status(200).json(availability)
      }
      createEntry();
    }
    else{
      res.status(500).json(error)
    }

    // if(typeof error == 'object' && error != null){
    //   // error.date = req.body.date;
    //   // error.startTime = [...req.body.startTime]
    //   // error.endTime = [... req.body.endTime]
    //   // await error.save();
    //   // res.status(200).json(error)
    //   console.log("Date matched")
    // }
    // else{
    //   // const newAvailability = new Availability({
    //   //   mentorId: req.body.mentorId,
    //   //   date: req.body.date,
    //   //   startTime: req.body.startTime,
    //   //   endTime: req.body.endTime
    //   // })
    //   // //save the availability
    //   // const availability = await newAvailability.save()
    //   // res.status(200).json(availability)
    //   console.log("Date not matched")
    // }
  }
})

// router.post("/", async (req, res) => {
//   const mentorId = req.body.mentorId
//   try {
//     const availableObj = await Availability.find({ mentorId });

//     console.log("hi")
//     availableObj.date = req.body.date;
//     availableObj.startTime = [...req.body.startTime]
//     availableObj.endTime = [...req.body.endTime]

//     await availableObj.save();

//     res.status(200).json(availableObj);
//     if (availableObj.date === req.body.date ) {
//     }
//     else{
//       const newAvailability = new Availability({
//         mentorId: req.body.mentorId,
//         date: req.body.date,
//         startTime: req.body.startTime,
//         endTime: req.body.endTime
//       })
//       //save the availability
//       const availability = await newAvailability.save()
//       res.status(200).json(availability)
//     }
//   } catch (error) {
//     const newAvailability = new Availability({
//       mentorId: req.body.mentorId,
//       date: req.body.date,
//       startTime: req.body.startTime,
//       endTime: req.body.endTime
//     })
//     //save the availability
//     const availability = await newAvailability.save()
//     res.status(200).json(availability)


//   }
// })
//create availability and post dates and time slot
// router.post("/", async (req, res) => {
//   const mentorId = req.body.mentorId;
//   const availableObj = await find({ mentorId });
//   console.log(availableObj)
//   if (availableObj) {
//     try {
//       availableObj.date = req.body.date;
//       availableObj.startTime = req.body.startTime
//       availableObj.endTime = req.body.endTime

//       await availableObj.save();

//       res.status(200).json(availableObj);
//     } catch (error) {
//       try {
//         const newAvailability = new Availability({
//           mentorId: req.body.mentorId,
//           date: req.body.date,
//           startTime: req.body.startTime,
//           endTime: req.body.endTime
//         })
//         //save the availability
//         const availability = await newAvailability.save()
//         res.status(200).json(availability)
//       } catch (error) {
//         console.log(error)
//       }
//     }

//   }
//   else {
//     try {
//       const newAvailability = new Availability({
//         mentorId: req.body.mentorId,
//         date: req.body.date,
//         startTime: req.body.startTime,
//         endTime: req.body.endTime
//       })
//       //save the availability
//       const availability = await newAvailability.save()
//       res.status(200).json(availability)
//     } catch (error) {
//       console.log(error)
//     }

//   }
//   //create a new availability d
// })

//get all availability of single mentor 
router.get("/:id", async (req, res) => {
  const mentorId = req.params.id;
  try {
    const availability = await Availability.find({ mentorId })
    res.status(200).json(availability)
  } catch (error) {
    res.status(500).json(error)
  }
})

// //update availability 
// router.patch("/availability/:id", async (req, res) => {
//   try {
//     const updatedAvailability = await Availability.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     )
//     res.status(200).json(updatedAvailability)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

//delete availability
router.delete("/:id", async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "Success" })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
