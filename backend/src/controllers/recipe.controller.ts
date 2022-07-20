import RecipeService from "../services/recipe.service";
import Express from "express";

const RecipeController = {
  getAll: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
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

  post: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
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

  get: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { recipeId } = req.params;
    try {
      const response = await RecipeService.get(recipeId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  put: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
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

  delete: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;

    try {
      const response = await RecipeService.delete(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  like: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
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
