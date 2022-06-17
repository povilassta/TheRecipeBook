import RecipeService from "../services/recipe.service.js";

const RecipeController = {
  getAll: async (req, res, next) => {
    console.log("Hit.");
    const pageNum = req.query.pageNum ? req.query.pageNum - 1 : 0;
    try {
      const response = await RecipeService.getMultiple(pageNum);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  get: async (req, res, next) => {
    const { recipeId } = req.params;
    try {
      const response = await RecipeService.get(recipeId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },
};

export default RecipeController;
