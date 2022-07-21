import express from "express";
import RecipeController from "../controllers/recipe.controller";
import { authJwt } from "../services/auth.service";
import RecipeService from "../services/recipe.service";
import commentRouter from "./comment.route";

const recipeRouter = express.Router();
const recipeController = RecipeController.getInstance();
const recipeService = RecipeService.getInstance();

// GET (all)
recipeRouter.post("/", recipeController.getAll);

// GET (one)
recipeRouter.get("/:recipeId", recipeController.get);

// LIKE
recipeRouter.patch("/:recipeId/like", authJwt, recipeController.like);

// POST RECIPE
recipeRouter.post("/create", authJwt, recipeController.post);

// PUT RECIPE
recipeRouter.put("/:recipeId", authJwt, recipeController.put);

// DELETE RECIPE
recipeRouter.delete("/:recipeId", authJwt, recipeController.delete);

recipeRouter.use(
  "/:recipeId/comments",
  function (req, res, next) {
    recipeService.addRecipeIdParam(req);
    next();
  },
  commentRouter
);

export default recipeRouter;
