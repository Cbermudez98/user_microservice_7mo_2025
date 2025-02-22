import mongoose from "mongoose";
import { IUserCreate } from "../../domain/models/IUser";
import { CONSTANTS } from "../../../../infrastructure/constants/constants";
const { Schema } = mongoose;

const userSchema = new Schema<IUserCreate>(
  {
    name: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: false,
  }
);

export const UserModel = mongoose.model("user", userSchema);
