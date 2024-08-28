import dotenv from "dotenv";

dotenv.config();

export const ENV_VARIABLE = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
};
