import { Schema, model } from "mongoose";

interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
});

export default model<ICategory>("Category", categorySchema);
