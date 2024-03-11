import mongoose from "mongoose";

const threadSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Relationship",
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);

export default Thread;
