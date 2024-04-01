import asyncHandler from "express-async-handler";
import Thread from "../models/threadModel.js";

export const getThread = asyncHandler(async (req, res) => {
  // const thread = await Thread.find({
  //   "participants.sender": req.params.id,
  // })
  //   .populate("participants.sender", "username")
  //   .populate("participants.receiver", "username");
  // // .sort({ updatedAt: 1 });

  res.status(200).json({ thread });
});

export const getThreads = asyncHandler(async (req, res) => {
  const sender = req.params.id;

  const existingThread = await Thread.find({
    $or: [
      { "participants.sender": sender },
      { "participants.receiver": sender },
    ],
  }).populate("participants.receiver", "username");

  if (existingThread) {
    res.status(201).json({ existingThread });
  } else {
    res.status(400).json({ message: "Thread does not exist" });
  }
});

// DELETE - delete message
export const deleteThread = asyncHandler(async (req, res) => {
  await Thread.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "message deleted" });
});

export const createThread = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;

  // Search for selected thread
  const existingThread = await Thread.findOne({
    participants: {
      $elemMatch: { sender: sender, receiver: receiver },
    },
  });

  // If thread exists, notify client no need to make a new thread
  if (existingThread) {
    res
      .status(400)
      .json({ message: "Thread currently exists between these users" });
  } else {
    const newThread = await Thread.create({
      participants: [{ sender, receiver }],
    });
    res.status(200).json({ newThread });
  }
});

export const getFirstThread = asyncHandler(async (req, res) => {
  const firstThread = await Thread.findOne({
    "participants.sender": req.params.id,
  })
    .populate("participants.sender", "username")
    .populate("participants.receiver", "username")
    .sort({ updatedAt: 1 });

  if (firstThread) {
    res.status(201).json({ firstThread });
  } else {
    res.status(401).json({ message: "First thread not found" });
  }
});
