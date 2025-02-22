import { IUser, IUserCreate, IUserUpdate } from "../models/IUser";

export interface IUserService {
  create(user: IUserCreate): Promise<IUser>;
  update(id: IUser["_id"], user: IUserUpdate): Promise<boolean>;
  delete(id: IUser["_id"]): Promise<boolean>;
  get(id: IUser["_id"]): Promise<IUser>;
}
