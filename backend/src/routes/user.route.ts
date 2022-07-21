import express from "express";
import UserController from "../controllers/user.controller";

const userRouter = express.Router();

// GET (one)
userRouter.get("/:userId", UserController.get);

export default userRouter;
