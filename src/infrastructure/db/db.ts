import mongoose from "mongoose";
import { IDatabase } from "../interfaces/IDatabase";
import { injectable } from "inversify";

@injectable()
export class Database implements IDatabase {
  async init(url: string, dbName: string): Promise<void> {
    try {
      await mongoose.connect(url, { dbName });
    } catch (error) {
      console.error("Error at connection", error);
      process.exit(1);
    }
  }
}
