import RecipeService from "./recipe.service";
import Comment from "../models/comment.model";
import NotFoundError from "../errors/notfound.error";

const CommentService = {
  get: async (recipeId) => {
    try {
      const comments = await Comment.find({ recipeId })
        .sort("-date")
        .populate("user", "-password -email");
      return comments;
    } catch (errors) {
      throw errors;
    }
  },

  insert: async (data, recipeId, userId) => {
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
  },
};

export default CommentService;