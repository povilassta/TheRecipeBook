import NotFoundError from "../errors/notfound.error.js";
import Recipe from "../models/recipe.model.js";

const RecipeService = {
  getAll: async () => {
    try {
      const recipes = await Recipe.find({});
      return recipes;
    } catch (errors) {
      throw errors;
    }
  },

  get: async (recipeId) => {
    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new NotFoundError("Recipe not found.");
      }
      return recipe;
    } catch (errors) {
      throw errors;
    }
  },
};

export default RecipeService;
