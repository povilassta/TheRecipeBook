import express from "express";
import RecipeController from "../controllers/recipe.controller.js";
import RecipeService from "../services/recipe.service.js";
import commentRouter from "./comment.route.js";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.post("/", RecipeController.getAll);

// GET (one)
recipeRouter.get("/:recipeId", RecipeController.get);

// POST pictures
recipeRouter.post("/upload", RecipeController.uploadPictures);

// POST RECIPE
recipeRouter.post("/create", RecipeController.post);

recipeRouter.use(
  "/:recipeId/comments",
  function (req, res, next) {
    RecipeService.addRecipeIdParam(req);
    next();
  },
  commentRouter
);

export default recipeRouter;
