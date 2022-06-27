import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./config/db.config.js";
import recipeRouter from "./routes/recipe.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import categoryRouter from "./routes/category.route.js";
import fileUpload from "express-fileupload";

const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/", authRouter);

app.use(express.static("public"));
app.use("/images/recipes", express.static("images/recipes"));
app.use("/images/users", express.static("images/users"));

//Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
