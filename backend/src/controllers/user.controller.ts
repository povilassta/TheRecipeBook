import UserService from "../services/user.service";
import Express from "express";

const UserController = {
  get: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { userId } = req.params;
    try {
      const response = await UserService.get(userId);
      let responseObj = response.toObject();
      delete responseObj.password;
      res.status(200).json(responseObj);
    } catch (e) {
      next(e);
    }
  },
};

export default UserController;
