import express from "express";
import RecipeController from "../controllers/recipe.controller.js";
import { authJwt } from "../services/auth.service.js";
import RecipeService from "../services/recipe.service.js";
import commentRouter from "./comment.route.js";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.post("/", RecipeController.getAll);

// GET (one)
recipeRouter.get("/:recipeId", RecipeController.get);

// POST pictures
recipeRouter.post("/upload", authJwt, RecipeController.uploadPictures);

// POST RECIPE
recipeRouter.post("/create", authJwt, RecipeController.post);

// PUT RECIPE
recipeRouter.put("/:recipeId", authJwt, RecipeController.put);

recipeRouter.use(
  "/:recipeId/comments",
  function (req, res, next) {
    RecipeService.addRecipeIdParam(req);
    next();
  },
  commentRouter
);

export default recipeRouter;
