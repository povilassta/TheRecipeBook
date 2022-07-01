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

  post: async (req, res, next) => {
    const { files } = req;
    const data = JSON.parse(req.body.data);
    const { _id: userId } = req.user;
    try {
      const response = await RecipeService.post(files, data, userId);
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

  put: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { recipeId } = req.params;
    const { files } = req;
    const markedForDeletion = JSON.parse(req.body.markedForDeletion);
    const data = JSON.parse(req.body.data);
    try {
      const response = await RecipeService.put(
        data,
        userId,
        recipeId,
        markedForDeletion,
        files
      );
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { recipeId } = req.params;

    try {
      const response = await RecipeService.delete(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },
};

export default RecipeController;
