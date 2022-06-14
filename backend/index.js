import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./config/db.config.js";
import recipeRouter from "./routes/recipe.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/recipes", recipeRouter);
app.use("/users", userRouter);
app.use("/", authRouter);

app.use(express.static("public"));
app.use("/images/recipes", express.static("images/recipes"));
app.use("/images/users", express.static("images/users"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
