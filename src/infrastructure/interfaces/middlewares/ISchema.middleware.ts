import Joi from "joi";
import { IMiddlewareType } from "../../express/middleware.type";

export interface ISchemaValidatorMiddleware {
  validate(schema: Joi.Schema): IMiddlewareType;
}
