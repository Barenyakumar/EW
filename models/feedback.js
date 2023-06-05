const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: [{type: mongoose.Types.ObjectId }],
        default: []
    },
    mentorId: {type: mongoose.Types.ObjectId},
    session_id: {
        type: [{type: mongoose.Types.ObjectId }],
        default: []
    },
    overall_experience: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    ui_experience: { 
        type: mongoose.Types.Decimal128, 
        required: true 
    },
    session_informative_experience: { 
        type: mongoose.Types.Decimal128, 
        required: true 
    },
    liking_mentor_experience: { 
        type: mongoose.Types.Decimal128, 
        required: true 
    },
    about_host: { 
        type: String 
    },
    other_feedback: { 
        type: String 
    }
})

module.exports = mongoose.model("Feedback", FeedbackSchema)