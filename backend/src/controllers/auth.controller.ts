import Express from "express";
import { login, register } from "../services/auth.service";
import { validationResult } from "express-validator";

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
      const response = await login(email, password);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
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
      const response = await register(data);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
