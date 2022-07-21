import express from "express";
import RecipeController from "../controllers/recipe.controller";
import AuthService from "../services/auth.service";
import RecipeService from "../services/recipe.service";
import commentRouter from "./comment.route";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.post("/", RecipeController.getAll);

// GET (one)
recipeRouter.get("/:recipeId", RecipeController.get);

// LIKE
recipeRouter.patch(
  "/:recipeId/like",
  AuthService.authJwt,
  RecipeController.like
);

// POST RECIPE
recipeRouter.post("/create", AuthService.authJwt, RecipeController.post);

// PUT RECIPE
recipeRouter.put("/:recipeId", AuthService.authJwt, RecipeController.put);

// DELETE RECIPE
recipeRouter.delete("/:recipeId", AuthService.authJwt, RecipeController.delete);

recipeRouter.use(
  "/:recipeId/comments",
  function (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    RecipeService.addRecipeIdParam(req);
    next();
  },
  commentRouter
);

export default recipeRouter;
