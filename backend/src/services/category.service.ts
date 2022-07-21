import Category from "../models/category.model";

class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  public async getForRecipes() {
    try {
      const categories = await Category.find({});
      return categories;
    } catch (errors) {
      throw errors;
    }
  }
}

export default CategoryService;
