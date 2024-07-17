const Otp = require("../models/otpmodel");
const User = require("../models/usermodel");
const { sendemail } = require("../utils/email");
async function sendotp(req, res, next) {
  let num = "0123456789";
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp = otp + num[Math.floor(Math.random() * 10)];
  }

  console.log("otp", otp);
  try {
    let user = await User.find({ email: req.body.email });
    console.log(req.body.email);
    if (!user) {
      return res.send({
        message: "no user with given mail",
      });
    }
    const otpdoc = await Otp.findOneAndUpdate(
      //   id: user.id,
      { email: req.body.email },
      {
        otp,
        createdat: Date.now(),
        email: req.body.email,
      },
      {
        upsert: true,
        new: true,
      }
    );
    // await otpdoc.save();
    console.log(otpdoc);
    await sendemail({
      //   id: user._id,
      email: req.body.email,
      subject: "otp for autntication",
      message: otp,
    });

    res.send({
      message: "otp send succesfully",
    });
  } catch (e) {
    res.send({
      message: "error while sending otp",
      m: e.message,
    });
  }

  // next();
}
module.exports = { sendotp };
