import { Document } from "mongoose";
import { ICategory } from "../interfaces/category.interface";
import Category from "../models/category.model";

const CategoryService = {
  getForRecipes: async function () {
    try {
      const categories = await Category.find({});
      return categories;
    } catch (errors) {
      throw errors;
    }
  },
};

export default CategoryService;
