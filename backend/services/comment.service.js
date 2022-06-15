import RecipeService from "./recipe.service.js";
import Comment from "../models/comment.model.js";
import NotFoundError from "../errors/notfound.error.js";

const CommentService = {
  get: async (articleId) => {
    try {
      const comments = await Comment.find({ articleId }).populate(
        "user",
        "-password -email"
      );
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
