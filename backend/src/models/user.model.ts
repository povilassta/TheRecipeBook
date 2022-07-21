import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  profilePictureUrl: {
    type: String,
    default: "default.webp",
  },
});

export default model<IUser>("User", userSchema);
