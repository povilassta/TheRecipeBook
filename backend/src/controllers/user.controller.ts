import UserService from "../services/user.service";
import Express from "express";

class UserController {
  public async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    try {
      const response = await UserService.get(userId);
      let responseObj = response.toObject();
      delete responseObj.password;
      res.status(200).json(responseObj);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
