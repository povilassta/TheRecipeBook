import { login, register } from "../services/auth.service";
import { validationResult } from "express-validator";

const AuthController = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const response = await login(email, password);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { repeatPassword, ...data } = req.body;
    try {
      const response = await register(data);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default AuthController;
