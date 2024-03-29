import NotFoundError from "../errors/notfound.error";
import User from "../models/user.model";

class UserService {
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

export default new UserService();
