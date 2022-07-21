import express from "express";
import UserController from "../controllers/user.controller";

const userRouter = express.Router();
const userController = UserController.getInstance();

// GET (one)
userRouter.get("/:userId", userController.get);

export default userRouter;
