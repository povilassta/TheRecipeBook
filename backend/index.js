import express from "express";
import recipeRouter from "./routes/recipe.js";
import userRouter from "./routes/user.js";

const app = express();
const port = 3000;

// Routes
app.use("/recipes", recipeRouter);
app.use("/users", userRouter);

app.use(express.static("public"));
app.use("/images/recipes", express.static("images/recipes"));
app.use("/images/users", express.static("images/users"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
