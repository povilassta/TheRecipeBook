import RecipeService from "./recipe.service";
import Comment from "../models/comment.model";
import NotFoundError from "../errors/notfound.error";

type CommentData = {
  content: string;
};

class CommentService {
  private static instance: CommentService;

  private constructor() {}

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  private recipeService = RecipeService.getInstance();

  public async get(recipeId: string) {
    try {
      const comments = await Comment.find({ recipeId })
        .sort("-date")
        .populate("user", "-password -email");
      return comments;
    } catch (errors) {
      throw errors;
    }
  }

  public async insert(data: CommentData, recipeId: string, userId: string) {
    try {
      if (await this.recipeService.get(recipeId)) {
        const comment = await Comment.create({
          ...data,
          recipeId,
          user: userId,
        });
        return comment;
      } else {
        throw new NotFoundError("Recipe not found.");
      }
    } catch (errors) {
      throw errors;
    }
  }
}

export default CommentService;
