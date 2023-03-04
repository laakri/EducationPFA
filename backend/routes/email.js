const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "glassisaif@gmail.com",
    pass: "dianhzvpnncqtcoq",
  },
});
router.post("", (req, res, next) => {
  transporter
    .sendMail({
      from: req.body.email,
      to: "glassisaif@gmail.com",
      subject: req.body.name,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #726fdd; font-size: 30px;">${req.body.name}</h1>
          <p style="font-size: 18px; margin-bottom: 11px;">From: ${req.body.email}</p>
          <p style="font-size: 18px; margin-bottom: 20px;">Message:</p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">${req.body.textA}</p>
        </div>
      `,
    })
    .catch(console.error);
});

module.exports = router;
