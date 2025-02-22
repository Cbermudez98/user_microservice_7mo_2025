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
import { ISchemaValidatorMiddleware } from "../interfaces/ISchema.middleware";
import { SchemaValidatorMiddleware } from "../middlewares/schema.middleware";
import { IRouter } from "../express/IRouter";
import { UserRoute } from "../../modules/user/infrastructure/route/user.route";
import { IHandlerResponse } from "../interfaces/IHandler.response";
import { HandlerResponse } from "../express/response/handlerResponse";
import { IExpress } from "../express/IExpress";
import { ExpressFacade } from "../express/express";
import { IHashService } from "../../domain/services/IHash.service";
import { HashService } from "../services/Hash.service";

const container = new Container();

// bind
container.bind<IDatabase>(TYPES.DATABASE).to(Database);
container.bind<IUserService>(TYPES.USER_SERVICE).to(UserService);
container
  .bind<ISchemaValidatorMiddleware>(TYPES.SCHEMA_VALIDATOR_MIDDLEWARE)
  .to(SchemaValidatorMiddleware);
container.bind<IRouter>(TYPES.USER_ROUTER).to(UserRoute);
container.bind<IHandlerResponse>(TYPES.HANDLER_RESPONSE).to(HandlerResponse);
container.bind<IExpress>(TYPES.EXPRESS_FRAMEWORK).to(ExpressFacade);
container.bind<IHashService>(TYPES.HASH_SERVICE).to(HashService);
container
  .bind<IUseCase<IUserCreate, IUserWithOutPassword>>(TYPES.USER_CREATE_USE_CASE)
  .toDynamicValue((context) => {
    const userService = context.container.get<IUserService>(TYPES.USER_SERVICE);
    const hashService = context.container.get<IHashService>(TYPES.HASH_SERVICE);
    return new CreateUserUseCase(userService, hashService);
  });

export default container;
