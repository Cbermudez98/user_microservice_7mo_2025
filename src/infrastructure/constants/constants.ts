import { config } from "dotenv";

config();

export namespace CONSTANTS {
  export enum DATABASE_MODELS {
    USER = "user",
  }

  export enum ROLES {
    ADMIN = "admin",
    USER = "user",
    SECRETARY = "secretary"
  }
}

export const ENVIRONMENTS = {
  DATABASE_HOST: process.env.DATABASE_HOST || "",
  DATABASE_USER: process.env.DATABASE_USER || "",
  DATABASE_PWD: process.env.DATABASE_PWD || "",
  DATABASE_NAME: process.env.DATABASE_NAME || "",
  DATABASE_PORT: process.env.DATABASE_PORT || "",
  PORT: process.env.PORT || 8080,
  SECRET_KEY: process.env.JWT_SECRET || "",
};
