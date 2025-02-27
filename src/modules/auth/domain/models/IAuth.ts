import { IUser } from "../../../user/domain/models/IUser";

export interface IAuth extends Pick<IUser, "email" | "password"> {}

export interface IAuthResponse {
  type: string;
  token: string;
  //   refresh_token: string;
}
