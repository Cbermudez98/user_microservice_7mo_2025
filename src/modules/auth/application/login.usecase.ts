import { ForbidenException } from "../../../domain/errors/ForbiddenException";
import { IHashService } from "../../../domain/services/IHash.service";
import { IUseCase } from "../../../domain/useCase/useCase";
import { IUser } from "../../user/domain/models/IUser";
import { IUserService } from "../../user/domain/service/IUser.service";
import { IAuth, IAuthResponse } from "../domain/models/IAuth";
import { IAuthService } from "../domain/service/IAuth.service";

export class LoginUseCase implements IUseCase<IAuth, IAuthResponse> {
  constructor(
    private readonly authService: IAuthService,
    private readonly userService: IUserService,
    private readonly hashService: IHashService
  ) {}

  async execute(data: IAuth): Promise<IAuthResponse> {
    // 1. Obtener el usuario por el correo
    let user: IUser;

    try {
      user = await this.userService.getByEmail(data.email);
    } catch (error) {
      throw error;
    }

    const isValid = this.hashService.compare(data.password, user.password);
    // 2. Comparar la contrasena
    if (!isValid) {
      throw new ForbidenException("Password not matching");
    }
    // 3. Retornar el token
    const response = await this.authService.login(user);
    return {
      type: "Bearer",
      token: response,
    };
  }
}
