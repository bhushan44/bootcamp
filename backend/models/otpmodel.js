const mongoose = require("mongoose");
const otpsechema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "must have email"],
  },
  otp: {
    type: String,
    required: [true, "must have otp"],
  },
  createdat: {
    type: Date,
    default: Date.now(),
    // expires: 5,
  },
});
const Otp = mongoose.model("Otp", otpsechema);
module.exports = Otp;
