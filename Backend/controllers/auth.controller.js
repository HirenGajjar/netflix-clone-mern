import { UserModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSendCookie } from "../utils/generateToken.js";
//
export const signupController = async (req, res) => {
  try {
    // Get the data from request
    const { email, password, username } = await req.body;

    // Check if all the fields are not empty
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    // Check email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address!" });
    }
    //Check the length of password, it must be > 6
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should have at least 6 characters!",
      });
    }

    // Hash the password before saving it
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //Check if the email already exists

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    // Check for the username
    const existingUserByUsername = await UserModel.findOne({
      username: username,
    });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is unavailable!",
      });
    }
    //Add random image
    const PROFILE_IMAGES = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    //Choose a random image
    const image =
      PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];

    // If everything is good then create a new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
      image,
    });
    // generate token and save the user into DB and send the response
    generateTokenAndSendCookie(newUser._id, res);
    await newUser.save();
    // Send response
    res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: "" },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
//
export const loginController = async (req, res) => {
  try {
    //Check for email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    // Check in DB for email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
    //Check for the password
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials!" });
    }
    // Generate the token and cookie
    generateTokenAndSendCookie(user._id, res);
    // Send response
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
//
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix-clone-token");
    res.status(200).json({ success: true, message: "Logged out!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
