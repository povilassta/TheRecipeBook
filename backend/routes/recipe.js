import express from "express";

const recipeRouter = express.Router();

// GET (all)
recipeRouter.get("", (req, res) => {
  res.send("Should return recipes.");
});

// GET (one)
recipeRouter.get("/:id", (req, res) => {
  res.send("Should return a recipe.");
});

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
