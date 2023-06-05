const express = require("express")
const router = express.Router()
const Feedback = require("../models/feedback")

router.post("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const feedback = new Feedback({
            userId: userId,
            mentorId: req.body.mentorId,
            session_id: req.body.session_id,
            overall_experience: req.body.overall_experience,
            ui_experience: req.body.ui_experience,
            session_informative_experience: req.body.session_informative_experience,
            liking_mentor_experience: req.body.liking_mentor_experience,
            about_host: req.body.about_host,
            other_feedback: req.body.other_feedback
        })

        // const feedback = new Feedback(req.body)
        // feedback.userId.append(userId)
        const savedfeedback = await feedback.save();
        res.status(200).json(savedfeedback);
    } catch (error) {
        console.log(error);
        res.send(500).json(error);
    }
}
)


router.get("/all", async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.find({ userId: req.params.id });
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id/delete", async (req, res) => {
    try {
        const userId = req.params.id
        const feedback = await Feedback.deleteOne({ userId: userId })
        res.status(200).json("Deleted")
    }
    catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router