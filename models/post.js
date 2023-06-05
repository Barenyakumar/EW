const mongoose= require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postImg:{ 
        type:String,
        default: ""
    },
    postDesc:{
        type: String,
        max: 500
    },
    likes:{ 
        type: Array, 
        default: []
    }
},
{
    timestamps:true
});



module.exports = mongoose.model("Post", PostSchema);