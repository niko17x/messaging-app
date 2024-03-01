import mongoose, { mongo } from "mongoose";

const commentsSchema = mongoose.Schema({
  body: {
    type: String,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;
