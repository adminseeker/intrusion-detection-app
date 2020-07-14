const nodemailer = require("nodemailer");

var transporter =nodemailer.createTransport({
    service: "gmail",                           // Email Service
    auth: {
      user: process.env.LOGIN_EMAIL,            //Enter your login mail
      pass: process.env.LOGIN_PASSWORD          //Enter your login password
    }
  });
  
  var mailOptions = {
    from: process.env.LOGIN_EMAIL,               //Enter your login mail
    to: "",
    subject: "Intrusion Detection",
    text: ''
  };

  const mailer = async (toEmail,text)=>{
    mailOptions.to=toEmail;
    mailOptions.text=text;
    await transporter.sendMail(mailOptions);
  }

  module.exports = mailer;
