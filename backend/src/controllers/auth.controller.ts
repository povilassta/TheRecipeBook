import Express from "express";
import AuthService from "../services/auth.service";
import { validationResult } from "express-validator";
import "dotenv/config";

class AuthController {
  private static instance: AuthController;

  private constructor() {}

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  public async login(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const { email, password } = req.body;
    try {
      const { token, ...response } = await AuthService.login(email, password);
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
  }

  public async logout(
    _req: Express.Request,
    res: Express.Response,
    _next: Express.NextFunction
  ): Promise<void> {
    res
      .clearCookie("access-token")
      .status(200)
      .json({ message: "Logged out successfully!" });
  }

  public async register(
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
      const response = await AuthService.register(data);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
