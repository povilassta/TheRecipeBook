import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import { authJwt } from "../services/auth.service";

const authRouter = express.Router();
const authController: AuthController = AuthController.getInstance();

authRouter.post("/login", authController.login);

authRouter.get("/logout", authJwt, AuthController.logout);

authRouter.post(
  "/register",
  body("email").isEmail(),
  body("repeatPassword").custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  authController.register
);

export default authRouter;
