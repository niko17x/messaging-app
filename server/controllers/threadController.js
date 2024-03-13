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

// POST
export const getThread = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;
  console.log(`sender, ${sender}`);
  console.log(`receiver, ${receiver}`);
  // Search for selected thread
  const thread = await Thread.findOne({
    participants: { $all: [sender, receiver] },
  });

  // If thread exists, notify client no need to make a new thread
  if (thread) {
    res
      .status(400)
      .json({ message: "Thread currently exists between these users" });
  } else {
    // If not, create new thread
    const newThread = await Thread.create({
      participants: [sender, receiver],
    });
    res.status(200).json({ message: "all messages fetched", newThread });
  }
});

// GET - retrieve all messages from specific user
export const getThreads = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "messages from user fetched" });
});
