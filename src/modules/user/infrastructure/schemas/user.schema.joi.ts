import joi from "joi";
import { IUserCreate } from "../../domain/models/IUser";

const name = joi.string();
const lastName = joi.string();
const email = joi.string();
const password = joi.string();

export const userSchema = joi.object<IUserCreate>({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});
