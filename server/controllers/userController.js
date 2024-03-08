import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = res.status(400).json({ errors: errors.array() });
    console.log(validationErrors);
    return validationErrors;
  }

  const { firstName, lastName, username, email, password } = req.body;

  // * email & username are object values & thus can be called by dot notation
  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    if (userExists.email) {
      return res.status(400).json({
        message: "Email already exists",
      });
    } else if (userExists.username) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
  }

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } else {
    res.status(400).json({
      message: "Invalid user data",
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

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
      message: "Invalid credentials",
    });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(1),
  });

  res.status(200).json({
    message: "User logged out",
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json({
    message: "Successfully retrieved user profile",
    user,
  });
});
