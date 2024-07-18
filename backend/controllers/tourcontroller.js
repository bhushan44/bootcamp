const Tour = require("../models/tourmodel");
const { findByIdAndUpdate } = require("../models/usermodel");
async function createTour(req, res) {
  const name = req.body.name;
  const rating = req.body.rating;
  const price = req.body.price;
  try {
    const newTour = new Tour(req.body);
    const result = await newTour.save();
    res.json({
      message: "successfully created tour",
      data: result,
    });
  } catch (e) {
    res.json({
      status: "fail while creating new tour",
      message: e.message,
    });
  }
}
async function updateTour(req, res) {
  try {
    const result = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      message: "succsfully update tour",
      data: result,
    });
  } catch (e) {
    res.json({
      status: "error while updating tour",
      message: e.message,
    });
  }
}
async function getAllTours(req, res) {
  let newstring = JSON.stringify(req.query);
  newstring = JSON.parse(
    newstring.replace(/\b(gt|lt)\b/g, (match) => `$${match}`)
  );

  console.log(newstring);
  const Obj = { ...newstring };
  console.log(req.query);
  const exclude = ["sort", "limit", "page"];
  exclude.forEach((el) => {
    delete Obj[el];
  });

  try {
    const query = Tour.find(Obj);

    const result = await query;

    // console.log(Obj, req.query);
    res.json({
      message: "succsfully got tours",
      data: result,
    });
  } catch (e) {
    res.json({
      status: "error while finding tours",
      message: e.message,
    });
  }
}
async function getTour(req, res) {
  try {
    const result = await Tour.findById(req.params.id).populate("guides")
    if (result) {
      res.json({
        message: "succsfully got tour",
        data: result,
      });
    } else {
      res.json({
        message: "no tour exists",
      });
    }
  } catch (e) {
    res.json({
      status: "error while finding tour",
      message: e.message,
    });
  }
}

module.exports = { createTour, updateTour, getAllTours, getTour };
