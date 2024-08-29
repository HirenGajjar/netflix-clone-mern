import express from "express";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
//
const route = express.Router();
//
route.post("/signup", signupController);
//
route.post("/login", loginController);
//
route.post("/logout", logoutController);
//
export default route;
