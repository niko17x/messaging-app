import mongoose, { mongo } from "mongoose";

const relationshipSchema = mongoose.Schema(
  {
    participants: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reciever: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: new Date() }
);

const Relationship = mongoose.model("Relationship", relationshipSchema);

export default Relationship;
