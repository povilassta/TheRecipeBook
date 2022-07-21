import express from "express";
import CommentController from "../controllers/comment.controller";
import AuthService from "../services/auth.service";

const commentRouter = express.Router();

commentRouter.get("/", CommentController.get);

commentRouter.post("/", AuthService.authJwt, CommentController.insert);

export default commentRouter;
