const mongoose = require("mongoose");
const Tour = require("../models/tourmodel");
const User = require("../models/usermodel");
const Review = require("../models/review");
const Otp = require("../models/otpmodel");
const fs = require("fs");
mongoose
  .connect(
    "mongodb+srv://bhushan:bhushan@cluster0.clpcael.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successs");
  })
  .catch((e) => {
    console.log(e);
  });
const file = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, "utf-8"));

if (process.argv[2] == "create") {
  const tours = Review.create(file).then((users) => {
    console.log(users);
    process.exit();
  });
}
if (process.argv[2] == "delete") {
  const tours = Review.deleteMany().then((tours) => {
    console.log(tours);
    process.exit();
  });
}
