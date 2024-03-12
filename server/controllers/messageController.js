import asyncHandler from "express-async-handler";

// POST - create new message
export const createMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "okay" });
});

// DELETE - delete message
export const deleteMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "message deleted" });
});

// GET - retrieve all messages
export const getMessages = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "all messages fetched" });
});

// GET - retrieve all messages from specific user
export const getMessagesFromUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "messages from user fetched" });
});
