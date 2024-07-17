const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review must not be empty"],
  },
  rating: {
    type: String,
    required: [true, "tour must have rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "a review must be belong to a tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a review must be belong to a user"],
  },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
