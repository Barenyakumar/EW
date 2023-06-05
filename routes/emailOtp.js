const router = require('express').Router();
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const juice = require('juice')
const {htmlToText} = require("html-to-text")


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

// const welcome = `<div style="height: 100%;width:100%; background:#f2f8f8;display: flex;flex-direction: column;align-items: center;justify-content: flex-start;">
// <h1 style="text-align:center;">Hey user there 👋, welcome onboard ! 🎉</h1>
// <img src="./frontend//public/images/welcome.png" alt="" style="width: 100%;">
// <h2 style="color: rgb(83, 83, 83);">user.firstName, Let's do everything we can to help you make right decision.</h2>
// <a href="" style="/* height: 2rem; */ width:80%;border: 2px solid #79c0fd;text-align: center;padding:.5rem 0px;font-size: 2rem;color: rgb(139 142 167);font-family: serif;font-weight: bold;text-decoration: none;background: #b6daf9;margin: 1rem 0px;">Update you profile</a>
// <a href=""style="/* height: 2rem; */ width:80%;border: 2px solid #79c0fd;text-align: center;padding:.5rem 0px;font-size: 2rem;color: rgb(139 142 167);font-family: serif;font-weight: bold;text-decoration: none;background: #b6daf9;margin: 1rem 0px;">Explore Group session</a>
// <a href=""style="/* height: 2rem; */ width:80%;border: 2px solid #79c0fd;text-align: center;padding:.5rem 0px;font-size: 2rem;color: rgb(139 142 167);font-family: serif;font-weight: bold;text-decoration: none;background: #b6daf9;margin: 1rem 0px;">Find Mentors</a>
// <a href=""style="/* height: 2rem; */ width:80%;border: 2px solid #79c0fd;text-align: center;padding:.5rem 0px;font-size: 2rem;color: rgb(139 142 167);font-family: serif;font-weight: bold;text-decoration: none;background: #b6daf9;margin: 1rem 0px;">Search other users</a>
// </div>`


const welcome = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="OtpMailContainer" style="background-color: #344CB7; padding:2rem">
    <div class="companyName" style="color: white; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      Eduwarts
    </div>
    <div class="OtpcontianerSmall" style="background-color: white; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <div class="otpImage">
        <img src="otp-security.png" alt="" style="width: 100%; height: 50vh;">
      </div>
      <div class="otpMessage" style=" display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <div class="div1" style="font-size: 1rem; padding-top: 0.3rem;">Here is your One Time Password</div>
        <div class="div2" style="font-size: 0.6rem; padding-top: 0.5rem;">to validate your email address</div>
        <div class="otp" style="font-size: 2rem; padding-top: 0.5rem;">1234</div>
        <div class="footerData" style="font-size: 0.4rem; padding-top: 0.1rem;">Copy paste the otp in the browser</div>
      </div>
    </div>
  </div>
</body>
</html>`

router.post("/mail", (req, res) => {
  const templateVars ={
    userName:"Pratik Kumar",
    emailAddress: 'pizza@test.com',
  resetLink: 'https://justatest.com',

  }
  const templatePath = path.join(__dirname,'/email/welcome.html');
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, templateVars);
  const text = htmlToText(html);
  const htmlWithStylesInlined = juice(html);


  const options = {
    from: "team@eduwarts.tech",
    to: req.body.reciever,
    subject: "Testing purpose only 2414568769",
    text: text,
    html: htmlWithStylesInlined,
    headers: { 'x-myheader': 'test header' }
  }
  transporter.sendMail(options, function (err, info) {
    if (err) {
      res.status(500).json(err)
    }
    else
      res.status(200).json(info.response)
  })
})
function makeid(length) {
  var result = '';
  var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


router.post("/otp", (req, res) => {

  const otp = makeid(6);
  const options = {
    from: "team@eduwarts.tech",
    to: req.body.reciever,
    subject: "Email verification from Eduwarts.com",
    text: "Dear user your email verification code is: " + otp,
    html: `<h1>Dear user your email verification code is: ${otp}</h1>`,
  }

  transporter.sendMail(options, function (err, info) {
    if (err)
      res.status(500).json(err);
    else
      res.status(200).json({ email: req.body.reciever, otp: otp })
  })
})

module.exports = router;