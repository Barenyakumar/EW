const router = require('express').Router();
const nodemailer = require('nodemailer')



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

router.post("/mail",(req,res)=>{
    const options ={
        from:"team@eduwarts.tech",
        to:req.body.reciever,
        subject:req.body.subject,
        text:req.body.message
    }
    transporter.sendMail(options, function(err, info){
        if(err){
            res.status(500).json(err)
        }
        else
            res.status(200).json(info.response)
    })
})
function makeid(length) {
    var result           = '';
    var characters       = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


router.post("/otp", (req, res)=>{

    const otp = makeid(6);
    const options = {
      from: "eduwarts@outlook.com",
      to: req.body.reciever,
      subject: "Email verification from Eduwarts.com",
      html: ` <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "1rem 1rem",
      }}
    >
      <div
        className="eduwartsLogo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="./images/3.jpg"
          alt=""
          style={{ width: "60%", maxHeight: "50vh" }}
        />
      </div>
      <div
        className="welcomeMessage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "1rem 1rem",
        }}
      >
        <div
          className="messageLine1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "1rem 1rem",
          }}
        >
          Hey user there 👋, welcome onboard ! 🎉
        </div>
        <div
          className="messageLine2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "1rem 1rem",
          }}
        >
          user.firstName,let's do everything we can to help you make right
          decision.
        </div>
        <button>Visit Now</button>
      </div>
    </div>`,
    }

    transporter.sendMail(options,function (err, info){
        if(err)
            res.status(500).json(err);
        else
            res.status(200).json(otp);
    })
})

module.exports= router;