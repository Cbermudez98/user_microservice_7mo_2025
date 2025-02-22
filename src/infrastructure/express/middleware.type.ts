import { NextFunction, Request, Response } from "express";

export type IMiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
