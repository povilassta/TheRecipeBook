import { Schema, Types, model } from "mongoose";
import { IRecipe } from "../interfaces/recipe.interface";
import Comment from "./comment.model";

const recipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "At least one category is required."],
    },
  ],
  likeCounter: [
    {
      type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
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

export default model<IRecipe>("Recipe", recipeSchema);
