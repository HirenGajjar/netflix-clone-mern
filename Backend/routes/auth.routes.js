import express from "express";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
//
const route = express.Router();
//
route.get("/signup", signupController);
//
route.get("/login", loginController);
//
route.get("/logout", logoutController);
//
export default route;
