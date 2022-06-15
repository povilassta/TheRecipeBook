import express from "express";
import RecipeController from "../controllers/recipe.controller.js";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.get("/", RecipeController.getAll);

// GET (one)
recipeRouter.get("/:recipeId", RecipeController.get);

// POST
recipeRouter.post("", (req, res) => {
  res.send("Should post a recipe.");
});

// PUT
recipeRouter.put("/:id", (req, res) => {
  res.send("Should update a recipe.");
});

// DELETE
recipeRouter.delete("/:id", (req, res) => {
  res.send("Should delete a recipe.");
});

export default recipeRouter;
