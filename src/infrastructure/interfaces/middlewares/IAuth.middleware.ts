import { IMiddlewareType } from "../../express/middleware.type";

export interface IAuthMiddleware {
  validate(): IMiddlewareType;
}
