import { Request, Response, Router } from "express";
import { TYPES } from "../../../../infrastructure/containers/types";
import { IUseCase } from "../../../../domain/useCase/useCase";
import { IRouter } from "../../../../infrastructure/express/IRouter";
import { inject, injectable } from "inversify";
import { ISchemaValidatorMiddleware } from "../../../../infrastructure/interfaces/middlewares/ISchema.middleware";
import { IHandlerResponse } from "../../../../infrastructure/interfaces/IHandler.response";
import { authSchema } from "../schema/auth.schema";
import { IAuth, IAuthResponse } from "../../domain/models/IAuth";
import { IAuthMiddleware } from "../../../../infrastructure/interfaces/middlewares/IAuth.middleware";
import { IRoleMiddleware } from "../../../../infrastructure/interfaces/middlewares/IRole.middleware";
import { CONSTANTS } from "../../../../infrastructure/constants/constants";
import { IRequest } from "../../../../infrastructure/interfaces/IRequest";

@injectable()
export class AuthRoute implements IRouter {
  private route = Router();
  constructor(
    @inject(TYPES.SCHEMA_VALIDATOR_MIDDLEWARE)
    private readonly schemaValidator: ISchemaValidatorMiddleware,
    @inject(TYPES.AUTH_VALIDATOR_MIDDLEWARE)
    private readonly authValidatorMiddleware: IAuthMiddleware,
    @inject(TYPES.ROLE_VALIDATOR_MIDDLEWARE)
    private readonly roleMiddleware: IRoleMiddleware,
    @inject(TYPES.HANDLER_RESPONSE)
    private readonly handlerResponse: IHandlerResponse,
    @inject(TYPES.LOGIN_USE_CASE)
    private readonly loginUseCase: IUseCase<IAuth, IAuthResponse>
  ) {}
  init(): Router {
    this.route.get(
      "/protected",
      this.authValidatorMiddleware.validate(),
      this.roleMiddleware.validate([
        CONSTANTS.ROLES.USER,
        CONSTANTS.ROLES.ADMIN,
      ]),
      // Devolver los datos del usuario
      (req: IRequest, res: Response) => {
        this.handlerResponse.manage({
          promise: Promise.resolve({ msg: "Hello world", id: req.id }),
          status: 200,
          req,
          res,
        });
      }
    );

    this.route.post(
      "",
      this.schemaValidator.validate(authSchema),
      (req: Request, res: Response) => {
        this.handlerResponse.manage({
          promise: this.loginUseCase.execute(req.body),
          status: 200,
          req,
          res,
        });
      }
    );
    return this.route;
  }
}
