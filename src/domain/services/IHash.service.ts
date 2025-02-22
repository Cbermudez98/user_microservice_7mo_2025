export interface IHashService {
  encrypt(str: string): string;
  compare(str: string, encrypted: string): boolean;
}
