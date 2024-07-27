const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const multer=require("multer")
const path = require('path');
const multers3=require("multer-s3")
const aws=require("@aws-sdk/client-s3")
// dotenv.config({path:"./config.env"})
const {
  createuser,
  getusers,
  deleteuser,
  // updateuser,
  getuser,
  signin,
  updateme,
  deleteme,
  login,
  // sendotp,
} = require("./controllers/usercontroller");
const {
  protect,
  restrictTo,
  forgetpasswordresettoken,
  resetpassword,
  updatepassword,
} = require("./controllers/authcontroller");
const {
  createTour,
  updateTour,
  getAllTours,
  getTour,
  deleteTour,
} = require("./controllers/tourcontroller");
const { createReview, getReviews, createOrUpdateReview } = require("./controllers/reviewcontroller");
const { sendotp } = require("./controllers/otpcontroller");
const{createBooking, getBookings,getCheckOutSession}=require("./controllers/bookingcontroller")
dotenv.config({ path: "./config.env" });
app.use(express.json());
// const corsOptions = {
//   origin: 'https://tripbhushan.vercel.app',
//   optionsSuccessStatus: 200
// };

app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/public/images")))
app.listen(5000, () => {
  console.log("app listening to port 5000");
});
const s3=new aws.S3({
  region:process.env.region,
  credentials:{
    accessKeyId:process.env.accesskey,
    secretAccessKey:process.env.secretkey
  }
})
console.log(s3)
// const  multerStorage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,"public/images/users")

//   },
//   filename:(req,file,cb)=>{
//     const ext=file.mimetype.split("/")[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// })
const uploadimage = () => {
  return multer({
    storage: multers3({
      s3: s3,
      bucket: "user-profile-s3",
      // acl: "public-read", // Add this line
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      }
    })
  });
};
const upload=uploadimage()
const setimag = (req, res, next) => {
  const uploadSingle = upload.single("photo");
  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    // await User.create({ photoUrl: req.file.location });
// console.log(req.file)
//     res.status(200).json({ success: "s" });
next()
  });
};
const  multerStorage2=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images/tours")

  },
  filename:(req,file,cb)=>{
    const ext=file.mimetype.split("/")[1];
    cb(null,`tour-${req.params.id}-${Date.now()}.${ext}`);
  }
})
const multerFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }
  else{
    const error = new Error("Not an image! Please upload only images.");
    error.status = 400; // Optional: set a status code for the error
    cb(error, false);
  }

}
// const upload=multer({
//   storage:multerStorage,
//   fileFilter:multerFilter
// })
const tourupload=multer({
  storage:multerStorage2,
  fileFilter:multerFilter
})
const upload2=tourupload.fields([{
  name:"imageCover",maxCount:1
},{name:"images",maxCount:3}])
app.route("/api/v1/users").get(protect, getusers).post(createuser);
app.route("/api/v1/user").get(protect,getuser);

// .patch(updateuser)
// .delete(protect, restrictTo("admin"), deleteuser);
app.route("/api/v1/sendotp").post(sendotp);
app.route("/api/v1/login").post(signin);
app.route("/api/v1/signin").post(login);
app.route("/api/v1/forgetpassword").post(forgetpasswordresettoken);
app.route("/api/v1/resetpassword/:token").post(resetpassword);
app.route("/api/v1/updatepassword").patch(protect, updatepassword);
app.route("/api/v1/updateuser").patch(protect,setimag,updateme);
app.route("/api/v1/deleteuser").delete(protect, deleteme);
app.route("/api/v1/tours").post(createTour);
app.route("/api/v1/tours/:id").patch(upload2,updateTour);
app.route("/api/v1/tours").get(getAllTours);
app.route("/api/v1/tours/:id").get(getTour)
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
// app.route("/api/v1/tours/:id").get(getTour).delete(deleteTour);
app.route("/api/v1/reviews/:tourId").post(protect,createOrUpdateReview).get(getReviews);
app.route("/api/v1/createbooking/:userid/:tourid/:price").get(createBooking)
app.route("/api/v1/getbookings").get(protect,getBookings)
app.route("/api/v1/bookings/checkout-session/:tourId").get(protect,getCheckOutSession)
module.exports = app;
