import RecipeService from "./recipe.service";
import Comment from "../models/comment.model";
import NotFoundError from "../errors/notfound.error";

type CommentData = {
  content: string;
};

class CommentService {
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
      if (await RecipeService.get(recipeId)) {
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

export default new CommentService();
