import express from "express";
import AuthController from "../controllers/auth.controller";
import { body, validationResult } from "express-validator";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

authRouter.post(
  "/register",
  body("email").isEmail(),
  body("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  AuthController.register
);

export default authRouter;
