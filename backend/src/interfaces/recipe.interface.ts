import { Types } from "mongoose";

export interface IRecipe {
  title: string;
  categories: Types.ObjectId[];
  likeCounter: Types.ObjectId[];
  timeMinutes: number;
  ingredients: string[];
  instructions: string[];
  imageUrls: string[];
  date: Date;
  userId: Types.ObjectId;
}
