import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";

// JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  const user = db.getUserByEmail(payload.email);

  return done(null, user || false);
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});

// Login
export function login(req, res) {
  // Find user in database
  console.log(req);
  const user = db.getUserByEmail(req.body.email);
  // Check if user exists and if the password is correct
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Sign the token with payload provided above
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Send token back
    res.status(200).json({
      token: `Bearer ${token}`,
    });
  } else {
    // If user doesn't exist or password is incorrect
    res.status(401).json({ message: "Invalid credentials" });
  }
}
