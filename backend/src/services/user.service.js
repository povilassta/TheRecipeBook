import NotFoundError from "../errors/notfound.error.js";
import User from "../models/user.model.js";

const UserService = {
  get: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (errors) {
      throw errors;
    }
  },
};

export default UserService;
