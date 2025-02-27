import { NextFunction, Request, Response } from "express";
import { CONSTANTS } from "../constants/constants";
import { IMiddlewareType } from "../express/middleware.type";
import { IRoleMiddleware } from "../interfaces/middlewares/IRole.middleware";
import { IRequest } from "../interfaces/IRequest";
import { injectable } from "inversify";

@injectable()
export class RoleMiddleware implements IRoleMiddleware {
  constructor() {}
  validate(roles: CONSTANTS.ROLES[]): IMiddlewareType {
    // LSP -> Liskov Sustitucion principle
    return (req: IRequest, res: Response, next: NextFunction) => {
      const role = <CONSTANTS.ROLES>req?.role;
      if (!role) {
        return res.status(401).send({
          msg: "Role not provide",
        });
      }

      if (!roles.includes(role)) {
        return res.status(401).send({
          msg: "You are not allowed",
        });
      }
      next();
    };
  }
}
