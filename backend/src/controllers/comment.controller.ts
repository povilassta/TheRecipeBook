import CommentService from "../services/comment.service";
import Express from "express";

class CommentController {
  private static instance: CommentController;

  private constructor() {}

  public static getInstance(): CommentController {
    if (!CommentController.instance) {
      CommentController.instance = new CommentController();
    }
    return CommentController.instance;
  }

  private commentService: CommentService = CommentService.getInstance();

  public async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { recipeId } = req;
    try {
      const response = await this.commentService.get(recipeId || "");
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async insert(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const userId = req.user?._id || "";
    const recipeId = req.recipeId || "";

    try {
      const response = await this.commentService.insert(
        req.body,
        recipeId,
        userId
      );
      res.json(response).send(201);
    } catch (e) {
      next(e);
    }
  }
}

export default CommentController;
