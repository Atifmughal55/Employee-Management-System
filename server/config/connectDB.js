import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide MongoDB Uri in the .env file");
}

//Connect to the MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected.");
  } catch (error) {
    console.log("MongoDB connection Error:", error);
  }
}

export default connectDB;
