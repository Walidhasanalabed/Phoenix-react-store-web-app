import mongoose from "mongoose";

// function, runnning to be able to connect to the database by using the connection string
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // 1 code means Exit with failure, 0 means success
  }
};
