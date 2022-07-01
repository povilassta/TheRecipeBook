export interface RecipePost {
  title: string;
  categories: string[];
  instructions: string[];
  ingredients: string[];
  timeMinutes: number;
  imageUrls?: string[];
}
