import CategoryService from "../services/category.service";
import Express from "express";

const CategoryController = {
  getForRecipes: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const response = await CategoryService.getForRecipes();
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },
};

export default CategoryController;
