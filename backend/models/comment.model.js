import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "Users",
    immutable: true,
    required: [true, "User id is required."],
  },
  recipeId: {
    type: mongoose.ObjectId,
    ref: "Recipes",
    immutable: true,
    required: [true, "Recipe id is required"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: [true, "Comment content is required."],
  },
});

export default mongoose.model("Comment", commentSchema);
