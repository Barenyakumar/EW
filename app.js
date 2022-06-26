const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const dotenv = require("dotenv")
const multer = require("multer")
const userAuth = require("./routes/userAuth");
const emailOtp = require("./routes/emailOtp")
const app = express();
const sessionRoutes = require("./routes/session");
const UserRoutes = require("./routes/users");
const sessionBooking = require("./routes/booking")
const availabilityRoutes = require("./routes/availability")


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false 
})

mongoose.connection.on("connected", () =>{
    console.log("Eduwats_DB is connected...")
})

app.use("/UserImages", express.static(path.join(__dirname, "public/userImages")));

app.use(express.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/userImages");
    },
    filename:(req, file, cb) =>{
        cb(null,req.body.name);
    },
});


const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000}
});

// const upload = multer({storage});
app.post("/upload", upload.single("file"), (req, res) =>{
    try{
        // pass file name as name(userId) and file as file in body for e.g..
        // {
        //     "name":"test.jpg"(this sould be userId of the user),
        //     "file":"selected file"
        // }
        return res.status(200).json("file uploaded successfully.");
    }catch(error){
        console.log(error); 
    }
})

app.use("/auth", userAuth);
app.use("/email",emailOtp);
app.use("/session", sessionRoutes);
app.use("/users", UserRoutes)
app.use("/booking", sessionBooking)
app.use("/availability", availabilityRoutes)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("frontend/build"))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

const PORT =process.env.PORT || 9000

app.listen(PORT , () => {
    console.log('Server started...')
})