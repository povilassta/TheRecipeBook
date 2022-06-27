import { Category } from './category.model';

export interface Recipe {
  _id: string;
  title: string;
  likeCounter: number;
  timeMinutes: number;
  ingredients: string[];
  categories: Category[];
  instructions: string[];
  imageUrls: string[];
  date: Date;
}
