import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = new User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstname: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

export const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get user profile" });
});
