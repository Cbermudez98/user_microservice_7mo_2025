export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserWithOutPassword extends Omit<IUser, "password"> {}

export interface IUserCreate extends Omit<IUser, "_id"> {}

export interface IUserUpdate extends Partial<IUserCreate> {}
