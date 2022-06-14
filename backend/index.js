import express from "express";
import recipeRouter from "./routes/recipe.js";

const app = express();
const port = 3000;

// Routes
app.use("/recipes", recipeRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
