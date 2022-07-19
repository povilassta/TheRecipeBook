import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
});

export default mongoose.model("Category", categorySchema);
