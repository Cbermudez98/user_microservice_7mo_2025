import Joi from "joi";
import { IAuth } from "../../domain/models/IAuth";
import {
  email,
  password,
} from "../../../user/infrastructure/schemas/user.schema.joi";

export const authSchema = Joi.object<IAuth>({
  email: email.required(),
  password: password.required(),
});
