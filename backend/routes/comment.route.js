import express from "express";
import CommentController from "../controllers/comment.controller.js";
import { authJwt } from "../services/auth.service.js";

const commentRouter = express.Router();

commentRouter.get("/", CommentController.get);

commentRouter.post("/", authJwt, CommentController.insert);

export default commentRouter;
