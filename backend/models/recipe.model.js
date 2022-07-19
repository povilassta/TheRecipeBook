import mongoose from "mongoose";
import Comment from "./comment.model.js";

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  categories: [
    {
      type: mongoose.ObjectId,
      ref: "Category",
      required: [true, "At least one category is required."],
    },
  ],
  likeCounter: [
    {
      type: mongoose.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  timeMinutes: {
    type: Number,
    required: [true, "Time is required."],
  },
  ingredients: [
    {
      type: String,
      required: [true, "Ingredients are required."],
    },
  ],
  instructions: [
    {
      type: String,
      required: [true, "Instructions are required."],
    },
  ],
  imageUrls: [
    {
      type: String,
      required: [true, "Image url is required."],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

// Middleware: when recipe is removed, remove its comments.
recipeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    Comment.deleteMany({ recipeId: this._id }).exec();
    next();
  }
);

export default mongoose.model("Recipe", recipeSchema);
