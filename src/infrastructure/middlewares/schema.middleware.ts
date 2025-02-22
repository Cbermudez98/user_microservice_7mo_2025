import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ISchemaValidatorMiddleware } from "../interfaces/ISchema.middleware";
import { injectable } from "inversify";
import { IMiddlewareType } from "../express/middleware.type";

@injectable()
export class SchemaValidatorMiddleware implements ISchemaValidatorMiddleware {
  validate(schema: Joi.Schema): IMiddlewareType {
    return (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const { error } = schema.validate(body);
      if (error) {
        res.status(400).send({ msg: "Body not matching" });
      } else {
        next();
      }
    };
  }
}
