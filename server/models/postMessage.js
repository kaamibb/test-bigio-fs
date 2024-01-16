import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Financial", "Technology", "Health"],
      required: true,
    },
    storyCover: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["Publish", "Draft"],
      required: true,
    },
    chaptertitle:{
      type: String,
      required: true,
    },
    storychapter:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
