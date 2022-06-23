import mongoose from "mongoose";

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
  likeCounter: {
    type: Number,
    default: 0,
  },
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
    default: Date.now(),
  },
});

export default mongoose.model("Recipe", recipeSchema);
