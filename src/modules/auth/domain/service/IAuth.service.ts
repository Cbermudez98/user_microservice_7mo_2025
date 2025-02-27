import { IUser } from "../../../user/domain/models/IUser";

export interface IAuthService {
  login(user: IUser): Promise<string>;
}
