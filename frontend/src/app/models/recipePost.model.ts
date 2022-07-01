export interface RecipePost {
  title: string | null | undefined;
  categories: string[] | null | undefined;
  instructions: string[];
  ingredients: string[];
  timeMinutes: number | null | undefined;
  imageUrls?: string[];
}
