import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { IHashService } from "../../domain/services/IHash.service";
import { injectable } from "inversify";

@injectable()
export class HashService implements IHashService {
  private readonly salt = genSaltSync(10);

  encrypt(str: string): string {
    return hashSync(str, this.salt);
  }
  compare(str: string, encrypted: string): boolean {
    return compareSync(str, encrypted);
  }
}
