import mongoose from "mongoose";
import "dotenv/config";
import "../models/user.model";
import "../models/recipe.model";
import "../models/comment.model";
import "../models/category.model";

class Connection {
  constructor() {
    const url = process.env.DB_URL;

    this.connect(url || "")
      .then(() => {
        console.log("✔ Database Connected");
      })
      .catch((err) => {
        console.error("✘ MONGODB ERROR: ", err.message);
      });
  }

  async connect(url: string) {
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
