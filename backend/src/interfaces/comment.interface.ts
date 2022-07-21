import { Types } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  recipeId: Types.ObjectId;
  date: Date;
  content: string;
}
