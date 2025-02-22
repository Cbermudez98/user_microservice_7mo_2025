import "reflect-metadata";

import container from "./infrastructure/containers/inversify";
import { IDatabase } from "./infrastructure/interfaces/IDatabase";
import { TYPES } from "./infrastructure/containers/types";

import { ENVIRONMENTS } from "./infrastructure/constants/constants";
import { IExpress } from "./infrastructure/express/IExpress";
import { IRouter } from "./infrastructure/express/IRouter";

const database = container.get<IDatabase>(TYPES.DATABASE);

const app = container.get<IExpress>(TYPES.EXPRESS_FRAMEWORK);

const userRoute = container.get<IRouter>(TYPES.USER_ROUTER);

// IIFE
(async () => {
  const url = `mongodb://${ENVIRONMENTS.DATABASE_USER}:${ENVIRONMENTS.DATABASE_PWD}@${ENVIRONMENTS.DATABASE_HOST}:${ENVIRONMENTS.DATABASE_PORT}/`;
  await database.init(url, ENVIRONMENTS.DATABASE_NAME);

  app.setRoute("/user", userRoute.init());

  app.init(Number(ENVIRONMENTS.PORT));
})();
