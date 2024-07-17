const mongoose = require("mongoose");
const { getMaxListeners } = require("./usermodel");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a tour must have name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  duration: {
    type: Number,
    required: [true, "a tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "a tour must have foup size"],
  },
  difficulty: {
    type: String,
    required: [true, "a tour must have a difficulty"],
  },
  ratingAverage: {
    type: Number,
    default: 0,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "a tour must have price"],
  },

  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: ["true", "a tour must have a image cover"],
  },
  images: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  startLocation: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    adress: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      adress: String,
      description: String,
      day: Number,
    },
  ],
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
  ],
  description:{
    type:String
  }
});
// tourSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour",
//   localField: "_id",
// });
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
