import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";

// POST - create new message
export const createMessage = asyncHandler(async (req, res) => {
  const { message, activeThreadId } = req.body;

  console.log(activeThreadId);

  if (!message) {
    return res.status(400).json({ message: "Message input is empty" });
  }

  if (!activeThreadId) {
    return res
      .status(400)
      .json({ message: "Failed to retrieve selectedThreadId" });
  }

  const newMessage = await Message.create({
    threadId: activeThreadId,
    message,
  });

  if (newMessage) {
    res
      .status(201)
      .json({ message: "Message successfully created", newMessage });
  }
});

export const deleteMessages = asyncHandler(async (req, res) => {
  console.log("first");
  const messages = await Message.deleteMany({ threadId: req.params.id });
  console.log(req.params.id);

  if (!messages) {
    res
      .status(404)
      .json({ message: "Failed to delete messages - messages not found" });
  } else {
    res.status(200).json({ messages });
  }
});

// GET - retrieve all messages from specific sender and receiver
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ threadId: req.params.id });

  if (!messages) {
    res.status(400).json({ message: "Failed to fetch messages" });
  }
  res.status(200).json({ messages });
});

// GET - retrieve specific message from specific user
export const getMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "messages from user fetched" });
});
