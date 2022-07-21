import CategoryService from "../services/category.service";
import Express from "express";

class CategoryController {
  public async getForRecipes(
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    try {
      const response = await CategoryService.getForRecipes();
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export default new CategoryController();
