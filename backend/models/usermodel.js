const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { type } = require("os");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have name"],
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin", "lead-guide"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    unique: true,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  conformPassword: {
    type: String,
    required: [true, "please provide conform password"],
    validate: {
      validator: function (el) {
        return this.password == el;
      },
      message: "passwords are not same",
    },
  },
  changepasswordat: Date,
  passwordresettoken: String,
  passwordresetexpiresin: Date,
  active: {
    type: Boolean,
    select: false,
  },
  photo:{
    type:String,
    default:"default.jpg"
  }
});
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.conformPassword = undefined;
  next();
});

userschema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.changepasswordat = Date.now() - 1000;
  next();
});
userschema.methods.correctpassword = async function (
  candidatepassword,
  password
) {
  return await bcrypt.compare(candidatepassword, password);
};
userschema.methods.changedpasswordafter = function (jwt) {
  if (this.changepasswordat) {
    let time = this.changepasswordat.getTime() / 1000;
    return jwt < time;
    // retrun;
  }
  return false;
};
userschema.methods.createpasswordresettoken = function () {
  const resettokken = crypto.randomBytes(32).toString("hex");
  this.passwordresettoken = crypto
    .createHash("sha256")
    .update(resettokken)
    .digest("hex");
  this.passwordresetexpiresin = Date.now() + 3000 * 60 * 1000;
  return resettokken;
};
const User = mongoose.model("User", userschema);
module.exports = User;
