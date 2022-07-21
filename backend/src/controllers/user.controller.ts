import UserService from "../services/user.service";
import Express from "express";

class UserController {
  private static instance: UserController;

  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  private userService: UserService = UserService.getInstance();

  public async get(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    try {
      const response = await this.userService.get(userId);
      let responseObj = response.toObject();
      delete responseObj.password;
      res.status(200).json(responseObj);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
