import { injectable } from "inversify";
import {
  IHandlerParam,
  IHandlerResponse,
} from "../../interfaces/IHandler.response";
import {
  CustomError,
  FoundExceptionError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../domain/errors";

@injectable()
export class HandlerResponse implements IHandlerResponse {
  async manage<T>(param: IHandlerParam<T>): Promise<void> {
    try {
      const data = await param.promise;
      param.res.status(param.status).send(data);
    } catch (error) {
      const errors = [
        CustomError,
        NotFoundError,
        InternalServerError,
        UnprocessableEntityError,
        FoundExceptionError,
      ];

      const err = errors.find((e) => error instanceof e);
      if (!err) {
        param.res.status(500).send({
          msg: "Internal error",
        });
      } else {
        const customErr = error as CustomError;
        param.res.status(customErr.status).send({ msg: customErr.message });
      }
    }
  }
}
