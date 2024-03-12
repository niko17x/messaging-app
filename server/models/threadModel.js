import mongoose from "mongoose";

export const threadSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);

export default Thread;

/**
 * Thread works as a 'container' for a conversation between 2 different users (or potentially more => group messaging).
 * Each thread creates a new unique ID which can be referenced to find specific messages.
 * Specific thread can be found by querying the 2 users in MDB to retrieve the specific ID.
 * ie: Thread.findOne({participants: {$all: [joanneId, nikoId]}})
 */
