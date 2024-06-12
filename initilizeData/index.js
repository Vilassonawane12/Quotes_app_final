const mongoose = require("mongoose");
const initData = require("./data");
const place = require("../models/quotesModel");

const MONGO_URL = "mongodb://127.0.0.1:27017/quote_app_final";
// process.env.MONGO_URL
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database..initialise!");
  } catch (error) {
    console.log("Error connecting to the database");
  }
};
connectDB();
// module.exports = connectDB;
const inittDB = async () => {
  // await place.deleteMany({});
  await place.insertMany(initData.data);
  console.log("Data was initilised");
};
inittDB();
