import jwt from "jsonwebtoken";
import { ENV_VARIABLE } from "../config/envVars.js";
//Generate token
export const generateTokenAndSendCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARIABLE.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix-clone-token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // equal to 15 days in milliseconds
    httpOnly: true, // Avoid XSS attacks
    sameSite: "strict", //avoid CSRF attacks
    secure: ENV_VARIABLE !== "development",
  });

  return token;
};
