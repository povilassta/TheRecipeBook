import CategoryService from "../services/category.service";
import Express from "express";

class CategoryController {
  private static instance: CategoryController;

  private constructor() {}

  public static getInstance(): CategoryController {
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController();
    }
    return CategoryController.instance;
  }

  private categoryService: CategoryService = CategoryService.getInstance();

  public async getForRecipes(
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    try {
      const response = await this.categoryService.getForRecipes();
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export default CategoryController;
