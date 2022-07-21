import CommentService from "../services/comment.service";
import Express from "express";

class CommentController {
  public async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { recipeId } = req;
    try {
      const response = await CommentService.get(recipeId || "");
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
      const response = await CommentService.insert(req.body, recipeId, userId);
      res.json(response).status(201);
    } catch (e) {
      next(e);
    }
  }
}

export default new CommentController();
