import { sign, verify } from "jsonwebtoken";
import { IJwtService, PayloadType } from "../../domain/services/IJwt.service";
import { ENVIRONMENTS } from "../constants/constants";

export class JwtService implements IJwtService {
  get(payload: PayloadType): string {
    return sign(payload, ENVIRONMENTS.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
  }

  validate(str: string): PayloadType | string {
    return verify(str, ENVIRONMENTS.SECRET_KEY);
  }
}
