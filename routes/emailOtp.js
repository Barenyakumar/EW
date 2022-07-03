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
    const options ={
        from:"eduwarts@outlook.com",
        to:req.body.reciever,
        subject:"Email verification from Eduwarts.com",
        text:"Dear user your email verification code is: "+otp
    }

    transporter.sendMail(options,function (err, info){
        if(err)
            res.status(500).json(err);
        else
            res.status(200).json(otp);
    })
})

module.exports= router;