import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
});

export default model<ICategory>("Category", categorySchema);
