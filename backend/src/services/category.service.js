import Category from "../models/category.model.js";

const CategoryService = {
  getForRecipes: async () => {
    try {
      const categories = await Category.find({});
      return categories;
    } catch (errors) {
      throw errors;
    }
  },
};

export default CategoryService;