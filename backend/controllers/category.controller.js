import CategoryService from "../services/category.service.js";

const CategoryController = {
  getForRecipes: async (req, res, next) => {
    try {
      const response = await CategoryService.getForRecipes();
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },
};

export default CategoryController;
