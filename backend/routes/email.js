const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "glassisaif@gmail.com",
    pass: "lzancbzgxykurssm",
  },
});

router.post("", (req, res, next) => {
  transporter
    .sendMail({
      from: req.body.email,
      to: "glassisaif@gmail.com",
      subject: req.body.name,
      html:
        "<h1 color='red'>" +
        req.body.name +
        "</h1<br><h2>" +
        req.body.email +
        "</h2><br><h4>" +
        req.body.textA +
        "</h4>",
    })
    .catch(console.error);
});

module.exports = router;
