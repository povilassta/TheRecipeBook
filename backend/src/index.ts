import express from "express";
import cors from "cors";
import "dotenv/config";
import "./config/db.config";
import recipeRouter from "./routes/recipe.route";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import errorHandler from "./middleware/errorHandler.middleware";
import categoryRouter from "./routes/category.route";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/", authRouter);

app.use(express.static("public"));
app.use("/images/recipes", express.static("images/recipes"));
app.use("/images/users", express.static("images/users"));
app.use("/icons", express.static("icons"));

//Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
