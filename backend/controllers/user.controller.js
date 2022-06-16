import UserService from "../services/user.service.js";

const UserController = {
  get: async (req, res, next) => {
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
