import { injectable } from "inversify";
import { NotFoundError } from "../../../../domain/errors/NotFoundError";
import { UnprocessableEntityError } from "../../../../domain/errors/UnprocessableEntityError";
import { IUserCreate, IUser, IUserUpdate } from "../../domain/models/IUser";
import { IUserService } from "../../domain/service/IUser.service";
import { UserModel } from "../models/User.model";
import { FoundExceptionError } from "../../../../domain/errors/FoundException";

@injectable()
export class UserService implements IUserService {
  async create(user: IUserCreate): Promise<IUser> {
    try {
      const isFound = await this.getUserByKey("email", user.email);
      if (isFound) {
        throw new FoundExceptionError("User is already in database");
      }
      const userToSave = new UserModel(user);
      const newUser = await userToSave.save();
      const id = newUser.toJSON()._id as any;
      return { ...newUser.toJSON(), _id: id };
    } catch (error) {
      throw error;
    }
  }

  async update(id: IUser["_id"], user: IUserUpdate): Promise<boolean> {
    const userFound = await this.get(id);
    try {
      await UserModel.updateOne({ _id: id }, { ...userFound, ...user });
      return true;
    } catch (error) {
      throw new UnprocessableEntityError("Could not update user");
    }
  }

  async delete(id: IUser["_id"]): Promise<boolean> {
    try {
      await UserModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      throw new NotFoundError("User not found");
    }
  }

  async get(id: IUser["_id"]): Promise<IUser> {
    try {
      const user = await this.getUserByKey("_id", id);
      if (!user) throw new Error("Not found");

      return { ...user };
    } catch (error) {
      throw new NotFoundError("User not found");
    }
  }

  private async getUserByKey(
    key: string,
    value: string
  ): Promise<IUser | null> {
    return await UserModel.findOne({ [key]: value });
  }
}
