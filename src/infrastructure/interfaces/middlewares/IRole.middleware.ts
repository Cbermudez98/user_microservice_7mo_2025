import { CONSTANTS } from "../../constants/constants";
import { IMiddlewareType } from "../../express/middleware.type";

export interface IRoleMiddleware {
  validate(role: CONSTANTS.ROLES[]): IMiddlewareType;
}
