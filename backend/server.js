const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("successfuly connected with mongodb");
  })
  .catch((e) => {
    console.log(e);
  });
console.log("app");
