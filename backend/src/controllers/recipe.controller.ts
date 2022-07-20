import RecipeService from "../services/recipe.service";
import Express from "express";

const RecipeController = {
  getAll: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { sort, categories, time, page } = req.body;
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

  post: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const images = req.files?.images;
    const data = JSON.parse(req.body.data);
    const userId = req.user?._id || "";
    try {
      const response = await RecipeService.post(images, data, userId);
      res.json(response).status(201);
    } catch (e) {
      next(e);
    }
  },

  get: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { recipeId } = req.params;
    try {
      const response = await RecipeService.get(recipeId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  put: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;
    const images = req.files?.images;
    const markedForDeletion = JSON.parse(req.body.markedForDeletion);
    const data = JSON.parse(req.body.data);
    try {
      const response = await RecipeService.put(
        data,
        userId,
        recipeId,
        markedForDeletion,
        images
      );
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  delete: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;

    try {
      const response = await RecipeService.delete(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  like: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;

    try {
      const response = await RecipeService.like(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },
};

export default RecipeController;
