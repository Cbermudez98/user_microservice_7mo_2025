export interface IDatabase {
  init(url: string, dbName: string): Promise<void>;
}
