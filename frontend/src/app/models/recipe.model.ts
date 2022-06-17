export interface Recipe {
  _id: string;
  title: string;
  likeCounter: number;
  timeMinutes: number;
  ingredients: string[];
  categories: string[];
  instructions: string[];
  imageUrl: string;
  date: Date;
}
