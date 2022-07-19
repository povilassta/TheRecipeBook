import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import UnauthorizedError from "../errors/unauthorized.error.js";
import ConflictError from "../errors/conflict.error.js";

// JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  const user = await User.findOne({ email: payload.email });

  return done(null, user || false);
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});

// Login
export async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
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

export async function register(data) {
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
