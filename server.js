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
const Session = require("./models/oneSession")
const fetch = require("node-fetch")
const nodemailer = require('nodemailer')
const postRoute = require('./routes/post')

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on("connected", () => {
    console.log("Eduwats_DB is connected...")
})


// setting up public dir
app.use(express.static('public'));
app.use("/UserImages", express.static(path.join(__dirname, "public/userImages")));

app.use(express.json());




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/userImages");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.fileName);
    },
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});

// const upload = multer({storage});
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        console.log(req.body);
        // pass file name as name(userId) and file as file in body for e.g..
        // {
        //     "name":"test.jpg"(this sould be userId of the user),
        //     "file":"selected file"
        // }
        return res.status(200).json("file uploaded successfully.");
    } catch (error) {
        console.log(error);
    }
})
 
app.use("/auth", userAuth);
app.use("/email", emailOtp);
app.use("/session", sessionRoutes);
app.use("/users", UserRoutes)
app.use("/booking", sessionBooking)
app.use("/availability", availabilityRoutes)
app.use("/posts",postRoute)

// update group session DB for past and upcoming data
setInterval(async () => {
    const session = await Session.find();
    session.forEach(async s => {
        const sessionDate = new Date(s.date + s.startTime);
        if (sessionDate.getTime() < Date.now()) {
            s.isActive = false;
            await s.save();
        }
    });
}, 1000);


// send mail to all the user's from array

const transporter = nodemailer.createTransport({
    // service:"webmail",
    host: "smtp.eduwarts.tech",
    port: 587,
    secure: false,
    auth: {
        user: "team@eduwarts.tech",
        pass: "tgxSUrp6",
    },
    tls: {
        rejectUnauthorized: false,
    },
})

// interval logic for repeating the call every 10 sec
var mailFlag = false;
var sessionDetails = {};

// api to toggle mail flag for each request
app.post("/send_mail_to_all", (req, res) => {
    mailFlag = true;
    sessionDetails = { ...req.body };
    res.status(200).json("initiated");
})
setInterval(() => {
    if (mailFlag)
        sendMail();
}, 10000);
async function sendMail() {
    const userList = await fetch("http://localhost:9000/users/all")
        .then(res => res.json())
        .then(userData => {
            userData.forEach(element => {
                const options = {
                    from: "team@eduwarts.tech",
                    to: element.email,
                    subject: `A group session ${sessionDetails.sessionBody.sessionName} is being created by ${sessionDetails.mentorName}`,
                    text: `Hi, ${userData.name}\n we hope you are doing well. We are happy to inform you that,\n\n\n\n
                \nA group session is being created with following details...\n
                Mentor:${sessionDetails.mentorName}\n
                Session Name:${sessionDetails.sessionBody.sessionName}\n
                Session Description: ${sessionDetails.sessionBody.description}\n
                Category:${sessionDetails.sessionBody.category}\n
                Session Type:${sessionDetails.sessionBody.sessionType}\n
                \n\n\n
                Date:${sessionDetails.sessionBody.date}\n
                Time:${sessionDetails.sessionBody.startTime}\n\n\n
                You can view and join session by following link\n\n
                http://localhost:3000/session/${sessionDetails.sessionId}\n\n\n\n\n\n
    
                This is an automated mail. Please do not reply to this mail.\n\n\n
                Team Eduwarts.`,
                }
                transporter.sendMail(options, function (err, info) {
                    if (err) {
                        console.log(err)
                    }
                    else
                        console.log(info.response)
                })
            });

        }).catch((err) => console.log(err))
    mailFlag = false;
    sessionDetails = {};
}




if (process.env.NODE_ENV == 'production') {
    app.use(express.static("frontend/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

// const PORT =process.env.PORT || 9000

app.listen(process.env.PORT, () => {
    console.log("Server started...")
})