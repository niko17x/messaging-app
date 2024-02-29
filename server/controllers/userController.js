import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register user" });
});

export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login user" });
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
