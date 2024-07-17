const Review = require("../models/review");
const User = require("../models/usermodel");

async function getReviews(req, res) {
  try {
    const data = await Review.find({ tour: req.params.id }).populate('user', 'name'); // Populating the user field to include the user's name
    res.json({
      status: "success",
      data
    });
  } catch (e) {
    res.json({
      message: e.message,
      status: "fail"
    });
  }
}

async function createReview(req, res) {
  try {
    // Extracting data from request
    const { review, rating } = req.body;
    const { tourId } = req.params;

    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ status: 'fail', message: 'You must be logged in to create a review.' });
    }

    // Check for existing review
    let existingReview = await Review.findOne({ tour: tourId, user: req.user.id });

    if (existingReview) {
      // Update the existing review
      existingReview.review = review;
      existingReview.rating = rating;
      existingReview.createdAt = Date.now();  // Optionally update the timestamp

      await existingReview.save();

      res.status(200).json({
        status: 'success',
        data: existingReview
      });
    } else {
      // Create a new review
      const newReview = await Review.create({
        review,
        rating,
        tour: req.params.tourId,
        user: req.user.id  // Assuming req.user contains the authenticated user's data
      });

      res.status(201).json({
        status: 'success',
        data: newReview
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: 'fail'
    });
  }
}
async function createOrUpdateReview(req,res) {
  try {
    console.log(req.params)
    review=req.body.review,
    rating=req.body.rating
    const reviewres = await Review.findOneAndUpdate(
      { tour: req.params.tourId, user: req.user.id },
      { 
        user:req.user.id,
        tour:req.params.tourId,
        review,
        rating,
        createdAt: Date.now(),
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if no match is found
        runValidators: true, // Run schema validators on update
      }
    );
    console.log("Review created or updated:", reviewres);
    res.json({
      status:"succesfuuly crated review"
    })
  } catch (error) {
    console.error("Error creating or updating review:", error);
    res.json({
      status:e.message
    })
  }
}

module.exports = { getReviews, createReview ,createOrUpdateReview};
