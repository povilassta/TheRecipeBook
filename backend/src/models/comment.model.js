import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    immutable: true,
    required: [true, "User id is required."],
  },
  recipeId: {
    type: mongoose.Types.ObjectId,
    ref: "Recipe",
    immutable: true,
    required: [true, "Recipe id is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: [true, "Comment content is required."],
  },
});

export default mongoose.model("Comment", commentSchema);
