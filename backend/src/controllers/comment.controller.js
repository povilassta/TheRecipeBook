import CommentService from "../services/comment.service.js";

const CommentController = {
  get: async (req, res, next) => {
    const { recipeId } = req;
    try {
      const response = await CommentService.get(recipeId);
      res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  },

  insert: async (req, res, next) => {
    const { _id: userId } = req.user;
    const { recipeId } = req;

    try {
      const response = await CommentService.insert(req.body, recipeId, userId);
      res.json(response).send(201);
    } catch (e) {
      next(e);
    }
  },
};

export default CommentController;
