import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri, {
      // Mongoose 9+ uses these options by default; kept for clarity.
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
