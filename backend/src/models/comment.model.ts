import { Schema, Types, model } from "mongoose";

interface IComment {
  user: Types.ObjectId;
  recipeId: Types.ObjectId;
  date: Date;
  content: string;
}

const commentSchema = new Schema<IComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    immutable: true,
    required: [true, "User id is required."],
  },
  recipeId: {
    type: Schema.Types.ObjectId,
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

export default model<IComment>("Comment", commentSchema);
