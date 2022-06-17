import NotFoundError from "../errors/notfound.error.js";
import Recipe from "../models/recipe.model.js";

const RecipeService = {
  getMultiple: async (pageNum) => {
    const perPage = 20;
    try {
      const recipes = await Recipe.find({})
        .sort({ title: "asc" })
        .skip(pageNum * perPage)
        .limit(perPage);
      return recipes;
    } catch (errors) {
      throw errors;
    }
  },

  getCount: async () => {
    try {
      const count = await Recipe.count({});
      return count;
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

  addRecipeIdParam: (req) => {
    req.recipeId = req.params.recipeId;
  },
};

export default RecipeService;
