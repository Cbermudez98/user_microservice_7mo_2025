import { Request, Response } from "express";

export interface IHandlerParam<T> {
  promise: Promise<T>;
  status: number;
  req: Request;
  res: Response;
}

export interface IHandlerResponse {
  manage<T>(param: IHandlerParam<T>): Promise<void>;
}
