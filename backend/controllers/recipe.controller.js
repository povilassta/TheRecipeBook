import RecipeService from "../services/recipe.service.js";

const RecipeController = {
  getAll: async (req, res, next) => {
    const page = req.query.page ? req.query.page - 1 : 0;
    const { sort, categories, time } = req.body;
    try {
      const response = await RecipeService.getMultiple(
        page,
        sort,
        categories,
        time
      );
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  uploadPictures: async (req, res, next) => {
    const { files } = req;
    try {
      const response = await RecipeService.uploadPictures(files);
      res.json(response).status(201);
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

  post: async (req, res, next) => {
    try {
      const response = await RecipeService.post(req.body);
      res.json(response).status(201);
    } catch (e) {
      next(e);
    }
  },
};

export default RecipeController;
