import RecipeService from "../services/recipe.service.js";

const RecipeController = {
  getAll: async (req, res, next) => {
    try {
      const response = await RecipeService.getAll();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  get: async (req, res, next) => {
    const { recipeId } = req.params;
    try {
      const response = await RecipeService.get(recipeId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default RecipeController;
