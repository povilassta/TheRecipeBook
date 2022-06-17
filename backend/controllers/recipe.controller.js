import RecipeService from "../services/recipe.service.js";

const RecipeController = {
  getAll: async (req, res, next) => {
    const page = req.query.page ? req.query.page - 1 : 0;
    try {
      const response = await RecipeService.getMultiple(page);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  getCount: async (req, res, next) => {
    try {
      const response = await RecipeService.getCount();
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
