import Express from "express";
import { login, register } from "../services/auth.service";
import { validationResult } from "express-validator";
import "dotenv/config";

const AuthController = {
  login: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { email, password } = req.body;
    try {
      const { token, ...response } = await login(email, password);
      res
        .cookie("access-token", token, {
          httpOnly: true,
          maxAge: 3600000,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(response);
    } catch (e) {
      next(e);
    }
  },

  logout: async function (
    _req: Express.Request,
    res: Express.Response,
    _next: Express.NextFunction
  ): Promise<void> {
    res
      .clearCookie("access-token")
      .status(200)
      .json({ message: "Logged out successfully!" });
  },

  register: async function (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
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
