import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import AuthService from "../services/auth.service";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

authRouter.get("/logout", AuthService.authJwt, AuthController.logout);

authRouter.post(
  "/register",
  body("email").isEmail(),
  body("repeatPassword").custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  AuthController.register
);

export default authRouter;
