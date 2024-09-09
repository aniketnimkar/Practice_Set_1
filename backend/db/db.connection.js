const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongoURI = process.env.MONGO_Connection_String;

const intializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Connected Successfully");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

module.exports = { intializeDatabase };
