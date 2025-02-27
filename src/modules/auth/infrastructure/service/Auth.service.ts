import { inject, injectable } from "inversify";
import { IAuthService } from "../../domain/service/IAuth.service";
import { IUser } from "../../../user/domain/models/IUser";
import { TYPES } from "../../../../infrastructure/containers/types";
import { IJwtService } from "../../../../domain/services/IJwt.service";
import { CONSTANTS } from "../../../../infrastructure/constants/constants";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.JWT_SERVICE) private readonly jwtService: IJwtService
  ) {}
  async login(user: IUser): Promise<string> {
    return this.jwtService.get({
      id: user._id,
      role: CONSTANTS.ROLES.USER,
    });
  }
}
