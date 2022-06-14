import mongoose from "mongoose";
import "dotenv/config";
import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";

class Connection {
  constructor() {
    const url = process.env.DB_URL;

    this.connect(url)
      .then(() => {
        console.log("✔ Database Connected");
      })
      .catch((err) => {
        console.error("✘ MONGODB ERROR: ", err.message);
      });
  }

  async connect(url) {
    if (process.env.NODE_ENV !== "test") {
      try {
        await mongoose.connect(url);
      } catch (e) {
        throw e;
      }
    }
  }
}

export default new Connection();
