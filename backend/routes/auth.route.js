import express from "express";
import { login } from "../services/auth.service.js";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  login(req, res);
});

export default authRouter;
