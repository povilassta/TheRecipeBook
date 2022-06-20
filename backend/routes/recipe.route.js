import express from "express";
import RecipeController from "../controllers/recipe.controller.js";
import RecipeService from "../services/recipe.service.js";
import commentRouter from "./comment.route.js";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.post("/", RecipeController.getAll);

// GET (count)

recipeRouter.post("/count", RecipeController.getCount);

// GET (one)
recipeRouter.get("/:recipeId", RecipeController.get);

recipeRouter.use(
  "/:recipeId/comments",
  function (req, res, next) {
    RecipeService.addRecipeIdParam(req);
    next();
  },
  commentRouter
);

export default recipeRouter;
