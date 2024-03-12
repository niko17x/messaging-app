import asyncHandler from "express-async-handler";
import Thread from "../models/threadModel.js";

// POST - create new message
export const createThread = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "okay" });
});

// DELETE - delete message
export const deleteThread = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "message deleted" });
});

// GET - retrieve all messages
export const getThread = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "all messages fetched" });
});

// GET - retrieve all messages from specific user
export const getThreads = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "messages from user fetched" });
});
