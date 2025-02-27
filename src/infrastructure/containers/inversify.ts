import { UserService } from "./../../modules/user/infrastructure/service/user.service";
import { Container } from "inversify";
import { IDatabase } from "../interfaces/IDatabase";
import { TYPES } from "./types";
import { Database } from "../db/db";
import { IUseCase } from "../../domain/useCase/useCase";
import {
  IUserCreate,
  IUserWithOutPassword,
} from "../../modules/user/domain/models/IUser";
import { IUserService } from "../../modules/user/domain/service/IUser.service";
import { CreateUserUseCase } from "../../modules/user/application/createUser.usecase";
import { ISchemaValidatorMiddleware } from "../interfaces/middlewares/ISchema.middleware";
import { SchemaValidatorMiddleware } from "../middlewares/schema.middleware";
import { IRouter } from "../express/IRouter";
import { UserRoute } from "../../modules/user/infrastructure/route/user.route";
import { IHandlerResponse } from "../interfaces/IHandler.response";
import { HandlerResponse } from "../express/response/handlerResponse";
import { IExpress } from "../express/IExpress";
import { ExpressFacade } from "../express/express";
import { IHashService } from "../../domain/services/IHash.service";
import { HashService } from "../services/Hash.service";
import { IJwtService } from "../../domain/services/IJwt.service";
import { JwtService } from "../services/Jwt.service";
import { IAuth, IAuthResponse } from "../../modules/auth/domain/models/IAuth";
import { LoginUseCase } from "../../modules/auth/application/login.usecase";
import { IAuthService } from "../../modules/auth/domain/service/IAuth.service";
import { AuthRoute } from "../../modules/auth/infrastructure/route/auth.route";
import { AuthService } from "../../modules/auth/infrastructure/service/Auth.service";
import { IAuthMiddleware } from "../interfaces/middlewares/IAuth.middleware";
import { AuthValidator } from "../middlewares/auth.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { IRoleMiddleware } from "../interfaces/middlewares/IRole.middleware";

const container = new Container();

// bind
container.bind<IDatabase>(TYPES.DATABASE).to(Database);
container.bind<IUserService>(TYPES.USER_SERVICE).to(UserService);
container
  .bind<ISchemaValidatorMiddleware>(TYPES.SCHEMA_VALIDATOR_MIDDLEWARE)
  .to(SchemaValidatorMiddleware);
container
  .bind<IAuthMiddleware>(TYPES.AUTH_VALIDATOR_MIDDLEWARE)
  .to(AuthValidator);
container
  .bind<IRoleMiddleware>(TYPES.ROLE_VALIDATOR_MIDDLEWARE)
  .to(RoleMiddleware);
container.bind<IRouter>(TYPES.USER_ROUTER).to(UserRoute);
container.bind<IRouter>(TYPES.AUTH_ROUTE).to(AuthRoute);
container.bind<IHandlerResponse>(TYPES.HANDLER_RESPONSE).to(HandlerResponse);
container.bind<IExpress>(TYPES.EXPRESS_FRAMEWORK).to(ExpressFacade);
container.bind<IHashService>(TYPES.HASH_SERVICE).to(HashService);
container.bind<IJwtService>(TYPES.JWT_SERVICE).to(JwtService);
container.bind<IAuthService>(TYPES.AUTH_SERVICE).to(AuthService);
container
  .bind<IUseCase<IUserCreate, IUserWithOutPassword>>(TYPES.USER_CREATE_USE_CASE)
  .toDynamicValue((context) => {
    const userService = context.container.get<IUserService>(TYPES.USER_SERVICE);
    const hashService = context.container.get<IHashService>(TYPES.HASH_SERVICE);
    return new CreateUserUseCase(userService, hashService);
  });
container
  .bind<IUseCase<IAuth, IAuthResponse>>(TYPES.LOGIN_USE_CASE)
  .toDynamicValue((context) => {
    const authService = context.container.get<IAuthService>(TYPES.AUTH_SERVICE);
    const userService = context.container.get<IUserService>(TYPES.USER_SERVICE);
    const hashService = context.container.get<IHashService>(TYPES.HASH_SERVICE);

    return new LoginUseCase(authService, userService, hashService);
  });

export default container;
