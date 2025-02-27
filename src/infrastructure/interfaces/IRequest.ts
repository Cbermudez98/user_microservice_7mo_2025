import { Request } from "express";

export interface IRequest extends Request {
  role?: string;
  id?: string;
}
