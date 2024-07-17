// const { default: isEmail } = require("validator/lib/isEmail");
const dotenv = require("dotenv");
const Otp = require("../models/otpmodel");
const { sendemail } = require("../utils/email");
const user = require("../models/usermodel");
const jswebtoken = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
function tokencreation(id) {
  const token = jswebtoken.sign({ id: id }, process.env.SECRET, {
    expiresIn: "90d",
  });
  return token;
}
function filterObj(obj, ...roles) {
  const newobj = {};
  Object.keys(obj).forEach((el) => {
    if (roles.includes(el)) {
      newobj[el] = obj[el];
    }
  });
  return newobj;
}
function createuser(req, res) {
  const { name, email, password, conformPassword, changepasswordat, role } =
    req.body;
  console.log(req.body, "body");
  // const date = new Date(changepasswordat);
  // console.log(date);
  const newuser = new user({
    name,
    role,
    email,
    password,
    conformPassword,
    changepasswordat,
  });
  newuser
    .save()
    .then((doc) => {
      // const token = jswebtoken.sign({ id: doc._id }, process.env.SECRET);
      const token = tokencreation(doc._id);
      res.json({
        status: "success",
        token,
        data: doc,
      });
    })

    .catch((e) => {
      res.send(e);
    });
}
async function getusers(req, res) {
  try {
    // const user1 = new user();
    const docs = await user.find();

    // console.log(docs);
    res.json({
      status: "success",
      // token,
      result: {
        docs,
      },
    });
  } catch (e) {
    res.send({
      status: "failure",
      error: e,
    });
  }
}

async function getuser(
  req,res
) {
  const userdetails=await user.findById(req.user.id)
  res.json({
    data:userdetails
  })
}
async function updateme(req, res) {
  if (req.body.password || req.body.conformPassword) {
    return res.json({
      message: "this route is not for updatepassword please use suitable route",
    });
  }
  const filterBody = filterObj(req.body, "name", "email");
  // filterBody.photo=req.file.fi
  // console.log(req.file,"fi")
  if(req.file){
    filterBody.photo=req.file.filename
  }
  const data = await user.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.json({
    status: "success",
    data,
  });
}
async function deleteme(req, res) {
  await user.findByIdAndUpdate(req.user.id, { active: false });
  res.json({
    message: "successfully deleted user",
  });
}
// async function deletme(req, res) {
//   console.log(req.params);
//   try {
//     let deluser = await user.deleteOne({ _id: req.params.id });
//     res.json({
//       deluser,
//     });
//   } catch (e) {
//     res.json({
//       error: e,
//     });
//   }
// }
async function signin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({
        status: "failure",
        message: "please provide mail and password",
      });
    }
    console.log("E", email);
    const result = await user.findOne({ email });
    console.log(result.password);

    if (!result || !(await result.correctpassword(password, result.password))) {
      return res.json({
        status: "failure",
        message: "invalid user or password",
      });
    }
    const token = tokencreation(result._id);
    res.json({
      status: "s",
      token,
    });
    // req.user = result;
    // console.log(req.user);
  } catch (e) {
    res.json({
      status: "error",
      error: e.message,
    });
  }
}
async function login(req, res) {
  try {
    const result = await Otp.findOne({ otp: req.body.otp });
    console.log(result);
    if (result) {
      return res.json({
        message: "otp verifird success",
      });
    } else {
      return res.json({
        message: "invalid otp",
      });
    }
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
}

module.exports = {
  createuser,
  getusers,
  getuser,
  // updateuser,
  // deleteuser,
  signin,
  login,
  tokencreation,
  updateme,
  deleteme,
};
