const mongoose = require("mongoose");

require('dotenv').config();
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");
    
  } catch (error) {
      console.log(`Error connecting to the database: ${error}`);
      process.exit(1);
  }
}
module.exports = connectToDb;