import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import UnauthorizedError from "../errors/unauthorized.error";
import ConflictError from "../errors/conflict.error";
import Express from "express";

type RegisterData = {
  email: string;
  username: string;
  password: string;
};

class AuthService {
  private opts: StrategyOptions = {
    jwtFromRequest: this.extractJwtFromCookie,
    secretOrKey: process.env.JWT_SECRET,
  };

  public jwtStrategy = new JwtStrategy(this.opts, async (payload, done) => {
    const user = await User.findOne({ email: payload.email });

    return done(null, user || false);
  });

  public authJwt = passport.authenticate("jwt", {
    session: false,
  });

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password || "")) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );
        let responseObj = user.toObject();
        delete responseObj.password;
        return {
          token: `Bearer ${token}`,
          expiresIn: process.env.JWT_EXPIRES_IN,
          user: responseObj,
        };
      } else {
        throw new UnauthorizedError("Invalid credentials");
      }
    } catch (errors) {
      throw errors;
    }
  }

  async register(data: RegisterData) {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new ConflictError("User with that email already exists");
      } else {
        const newUser = await User.create({
          email: data.email,
          username: data.username,
          password: bcrypt.hashSync(data.password, 10),
        });
        const response = newUser.toObject();
        delete response.password;
        return response;
      }
    } catch (errors) {
      throw errors;
    }
  }

  private extractJwtFromCookie(req: Express.Request): string | null {
    let token: string | null = null;
    if (req && req.cookies) {
      token = req.cookies["access-token"];
    }

    return token;
  }
}
export default new AuthService();
