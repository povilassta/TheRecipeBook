import NotFoundError from "../errors/notfound.error";
import User from "../models/user.model";

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async get(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (errors) {
      throw errors;
    }
  }
}

export default UserService;
