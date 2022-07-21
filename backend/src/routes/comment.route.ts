import express from "express";
import CommentController from "../controllers/comment.controller";
import { authJwt } from "../services/auth.service";

const commentRouter = express.Router();
const commentController = CommentController.getInstance();

commentRouter.get("/", commentController.get);

commentRouter.post("/", authJwt, commentController.insert);

export default commentRouter;
