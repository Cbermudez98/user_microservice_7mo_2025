import express, { Application, RequestHandler, Router } from "express";
import { IExpress } from "./IExpress";

export class ExpressFacade implements IExpress {
  private readonly _app: Application = express();

  constructor() {
    this.setMiddleware(express.json());
  }
  getApp(): Application {
    return this._app;
  }

  getRoute(): Router {
    return Router();
  }

  setMiddleware(middleware: RequestHandler): void {
    this._app.use(middleware);
  }

  setRoute(url: string, route: Router): void {
    this._app.use(url, route);
  }

  init(port: number): void {
    this._app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
