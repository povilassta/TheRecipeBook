import express from "express";
import CategoryController from "../controllers/category.controller";

const categoryRouter = express.Router();
const categoryController: CategoryController = CategoryController.getInstance();

//GET (for recipe)
categoryRouter.get("/", categoryController.getForRecipes);

export default categoryRouter;
