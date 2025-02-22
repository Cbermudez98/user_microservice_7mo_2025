import { Application, RequestHandler, Router } from "express";

export interface IExpress {
  getApp(): Application;
  getRoute(): Router;
  setMiddleware(middleware: RequestHandler): void;
  setRoute(url: string, route: Router): void;
  init(port: number): void;
}
