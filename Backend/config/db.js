import mongoose from "mongoose";
import { ENV_VARIABLE } from "./envVars.js";
//
export const connectDB = async () => {
  try {
    await mongoose.connect(`${ENV_VARIABLE.MONGO_URI}`);
  } catch (error) {
    process.exit(1);
  }
};
