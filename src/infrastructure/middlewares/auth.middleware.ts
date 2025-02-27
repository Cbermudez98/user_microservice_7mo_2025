import { NextFunction, Request, Response } from "express";
import { IMiddlewareType } from "../express/middleware.type";
import { IAuthMiddleware } from "../interfaces/middlewares/IAuth.middleware";
import { ForbidenException } from "../../domain/errors/ForbiddenException";
import { inject, injectable } from "inversify";
import { TYPES } from "../containers/types";
import { IJwtService } from "../../domain/services/IJwt.service";
import { IRequest } from "../interfaces/IRequest";

// Programacion funcional // clousure
// Currying
// Function composition // reduce function

// Programacion orientada a eventos
// Programacion orientada a aspectos
// Programacion syncrona
@injectable()
export class AuthValidator implements IAuthMiddleware {
  constructor(
    @inject(TYPES.JWT_SERVICE) private readonly jwtService: IJwtService
  ) {}
  validate(): IMiddlewareType {
    return (req: IRequest, res: Response, next: NextFunction) => {
      const authorization = req.headers?.authorization;
      if (!authorization) {
        return res.status(403).send({
          msg: "Token not provide",
        });
      }

      const [_, token] = authorization.split(" ");
      if (!token) {
        return res.status(403).send({
          msg: "Token not provide",
        });
      }

      const response: any = this.jwtService.validate(token);
      req.role = response.role;
      req.id = response.id;
      next();
    };
  }
}

// function say(str: string) {
//   console.log(str);
// }

// function add(a: number, b: number): number {
//   return a + b;
// }

// function minus(a: number, b: number): number {
//   return a - b;
// }

// function reduceFunctions(funcs: Function[]): string {
//   return funcs.reduceRight((acc, f) => f(acc, f), 0) + "";
// }

// const array = [add, minus, say];
// reduceFunctions(array);
