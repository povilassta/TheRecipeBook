import express from "express";
import CategoryController from "../controllers/category.controller.js";

const categoryRouter = express.Router();

//GET (for recipe)
categoryRouter.get("/", CategoryController.getForRecipes);

export default categoryRouter;
