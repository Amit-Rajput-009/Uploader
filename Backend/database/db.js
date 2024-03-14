const mongoose = require("mongoose");

require('dotenv').config();


const connectToDb = async () => {
  try {
    await mongoose.connect( "mongodb+srv://sofipom913:X0o0xYnHQLK1EJLE@cluster0.ct5kztr.mongodb.net/");
    console.log("Connected to DB.");
    
  } catch (error) {
      console.log(`Error connecting to the database: ${error}`);
      process.exit(1);
  }
}

module.exports = connectToDb;