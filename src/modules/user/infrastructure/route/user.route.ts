import { Request, Response, Router } from "express";
import { IUser, IUserCreate } from "../../domain/models/IUser";
import { TYPES } from "../../../../infrastructure/containers/types";
import { IUseCase } from "../../../../domain/useCase/useCase";
import { userSchema } from "../schemas/user.schema.joi";
import { IRouter } from "../../../../infrastructure/express/IRouter";
import { inject, injectable } from "inversify";
import { ISchemaValidatorMiddleware } from "../../../../infrastructure/interfaces/middlewares/ISchema.middleware";
import { IHandlerResponse } from "../../../../infrastructure/interfaces/IHandler.response";

@injectable()
export class UserRoute implements IRouter {
  private route = Router();
  constructor(
    @inject(TYPES.USER_CREATE_USE_CASE)
    private readonly createUserUseCase: IUseCase<IUserCreate, IUser>,
    @inject(TYPES.SCHEMA_VALIDATOR_MIDDLEWARE)
    private readonly schemaValidator: ISchemaValidatorMiddleware,
    @inject(TYPES.HANDLER_RESPONSE)
    private readonly handlerResponse: IHandlerResponse
  ) {}
  init(): Router {
    this.route.post(
      "",
      this.schemaValidator.validate(userSchema),
      (req: Request, res: Response) => {
        this.handlerResponse.manage({
          promise: this.createUserUseCase.execute(req.body),
          status: 200,
          req,
          res,
        });
      }
    );
    return this.route;
  }
}
