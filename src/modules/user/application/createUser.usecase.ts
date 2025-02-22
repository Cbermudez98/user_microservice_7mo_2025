import { IHashService } from "../../../domain/services/IHash.service";
import { IUseCase } from "../../../domain/useCase/useCase";
import { IUserCreate, IUserWithOutPassword } from "../domain/models/IUser";
import { IUserService } from "../domain/service/IUser.service";

export class CreateUserUseCase
  implements IUseCase<IUserCreate, IUserWithOutPassword>
{
  constructor(
    private readonly userService: IUserService,
    private readonly hashService: IHashService
  ) {}

  async execute(data: IUserCreate): Promise<IUserWithOutPassword> {
    try {
      const password = this.hashService.encrypt(data.password);
      const response: any = await this.userService.create({
        ...data,
        password,
      });
      delete response.password;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
