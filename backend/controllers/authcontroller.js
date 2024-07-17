const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const user = require("../models/usermodel");
const { tokencreation } = require("./usercontroller");
const { sendemail } = require("../utils/email");
const { query } = require("express");
async function protect(req, res, next) {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if (!token) {
    return res.json({
      status: "failure",
      message: "user not logged in ,please login to ACCESS TO DATA",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, "BHUSHAN");

    // next();
  } catch (e) {
    return res.json({
      message: "invalidd token",
    });
  }

  const freshuser = await user.findOne({ _id: decoded.id });
  if (!freshuser) {
    return res.json({
      message: "user no longer exists with that token",
    });
  }
  console.log(freshuser.iat, "iat");
  if (freshuser.changedpasswordafter(decoded.iat)) {
    return res.json({
      message: " user recently changed password login again",
    });
  }
  req.user = freshuser;
  next();
}
function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json("you dont have permission to perform thsi action");
    }

    next();
  };
}
async function forgetpasswordresettoken(req, res) {
  let email = req.body.email;
  let user1 = await user.findOne({ email });
  if (!user1) {
    res.json({
      status: "no users exists with given mail",
    });
  }
  const resettoken = user1.createpasswordresettoken();
  user1.save({ validateBeforeSave: false });
  const reseturl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resettoken}`;
  const message = `forgot your password? submit a patch request with your password and passwordconform to
  :${reseturl}.\n if you dont froget please ignore`;
  try {
    await sendemail({
      email: user1.email,
      subject: "password reset token valid for ten min",
      message,
    });
    res.json({
      message: "reset token successfully sent",
    });
  } catch (err) {
    (user1.passwordresettoken = undefined),
      (user1.passwordresetexpiresin = undefined);
    await user1.save({ validateBeforeSave: false });
    res.json({
      message: "there was an error sending mail please try agin later",
    });
  }
}
async function resetpassword(req, res) {
  const hashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(hashed);

  const user1 = await user.findOne({
    passwordresettoken: hashed,
    passwordresetexpiresin: { $gt: Date.now() },
  });
  console.log(user1);
  if (!user1) {
    return res.json({
      message: "invalid token or expired",
    });
  }
  try {
    console.log(req.body);
    user1.password = req.body.password;
    user1.conformPassword = req.body.conformPassword;

    user1.passwordresettoken = undefined;
    user1.passwordresetexpiresin = undefined;
    await user1.save();
    // const updatedUser = await user.updateOne(
    //   { _id: user1._id },
    //   {
    //     $set: {
    //       // password: req.body.password,
    //       // passwordresettoken: undefined,
    //       // passwordresetexpiresin: undefined,
    //       name: "bhu",
    //     },
    //   }
    // );
    // const u1 = await user.findByIdAndUpdate(
    //   user1._id,
    //   {
    //     name: "raa",
    //     password: req.body.password,
    //     $unset: {
    //       passwordresettoken: "",
    //       passwordresetexpiresin: "",
    //     },
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //     context: "query",
    //   }
    // );
    // console.log("u1", u1);
    // const u = await user.findOne({ _id: user1._id });
    // console.log("u", u);
    // await user1.save();
    // console.log("hh");
    const token = tokencreation(user1._id);
    res.json({
      status: "success",
      token,
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
}
async function updatepassword(req, res) {
  console.log("bhu", req.user);
  console.log(req.body);
  const currentuser = await user.findById(req.user.id);
  if (
    !(await currentuser.correctpassword(
      req.body.currentPassword,
      currentuser.password
    ))
  ) {
    return res.json({
      message: "current password is incorrect",
    });
  }
  (currentuser.password = req.body.newPassword),
    (currentuser.conformPassword = req.body.confirmPassword),
    await currentuser.save();
  const token = tokencreation(currentuser._id);
  res.json({
    status: "success",
    token,
  });
}

module.exports = {
  protect,
  restrictTo,
  forgetpasswordresettoken,
  resetpassword,
  updatepassword,
};
