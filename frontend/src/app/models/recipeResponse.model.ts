import { Recipe } from './recipe.model';

export interface RecipeResponse {
  recipes: Recipe[];
  count: number;
}
