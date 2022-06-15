import CommentService from "../services/comment.service.js";

const CommentController = {
  get: async (req, res, next) => {
    const { recipeId } = req;
    try {
      const response = await CommentService.get(recipeId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  insert: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { recipeId } = req;

    try {
      const response = await CommentService.insert(req.body, recipeId, userId);
      res.send(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default CommentController;
