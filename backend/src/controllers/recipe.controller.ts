import RecipeService from "../services/recipe.service";
import Express from "express";

class RecipeController {
  private static instance: RecipeController;

  private constructor() {}

  public static getInstance(): RecipeController {
    if (!RecipeController.instance) {
      RecipeController.instance = new RecipeController();
    }
    return RecipeController.instance;
  }

  private recipeService: RecipeService = RecipeService.getInstance();

  public async getAll(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { sort, categories, time, page } = req.body;
    try {
      const response = await this.recipeService.getMultiple(
        page,
        sort,
        categories,
        time
      );
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async post(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const images = req.files?.images;
    const data = JSON.parse(req.body.data);
    const userId = req.user?._id || "";
    try {
      const response = await this.recipeService.post(images, data, userId);
      res.json(response).status(201);
    } catch (e) {
      next(e);
    }
  }

  public async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { recipeId } = req.params;
    try {
      const response = await this.recipeService.get(recipeId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async put(
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
      const response = await this.recipeService.put(
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
  }

  public async delete(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;

    try {
      const response = await this.recipeService.delete(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async like(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const userId = req.user?._id || "";
    const { recipeId } = req.params;

    try {
      const response = await this.recipeService.like(recipeId, userId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export default RecipeController;
