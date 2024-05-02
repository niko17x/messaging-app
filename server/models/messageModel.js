import mongoose from "mongoose";
import Thread from "../models/threadModel.js";

const messageSchema = mongoose.Schema(
  {
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.post("save", async function (doc, next) {
  try {
    await Thread.findByIdAndUpdate(doc.threadId, {
      $set: { updatedAt: new Date() },
    });
  } catch (error) {
    console.error("Error updating thread timestamp:", error);
    next(error);
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

/**
 * Message schema references a single MDB message document.
 * Each newly generated message creates a new document.
 * ThreadId is the ID that is tied to the Thread that holds the conversation between the 2 users.
 */
