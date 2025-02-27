import joi from "joi";
import { IUserCreate } from "../../domain/models/IUser";

export const name = joi.string();
export const lastName = joi.string();
export const email = joi.string().email();
export const password = joi.string();

export const userSchema = joi.object<IUserCreate>({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});
