import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(mongoUrl);

    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
  }
};

export default connectDb;
