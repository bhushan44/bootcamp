const nodemailer = require("nodemailer");
const sendemail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "bhushanmandala456@gmail.com",
      pass: "gvgq rnpq vnfd cyjf",
    },
  });
  const emailoptions = {
    from: "bhushanmandala456@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(emailoptions);
};
module.exports = { sendemail };
