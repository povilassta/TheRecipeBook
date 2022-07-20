import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password?: string;
  username: string;
  profilePictureUrl: string;
}

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
