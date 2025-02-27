import { CONSTANTS } from "../constants/constants";

export const TYPES = {
  DATABASE: Symbol.for("Database"),
  USER_CREATE_USE_CASE: Symbol.for("UserCreateUseCase"),
  LOGIN_USE_CASE: Symbol.for("LoginUseCase"),
  USER_SERVICE: Symbol.for("UserService"),
  USER_ROUTER: Symbol.for("UserRouter"),
  AUTH_ROUTE: Symbol.for("AuthRouter"),
  SCHEMA_VALIDATOR_MIDDLEWARE: Symbol.for("SchemaValidatorMiddleware"),
  AUTH_VALIDATOR_MIDDLEWARE: Symbol.for("AuthValidatorMiddleware"),
  ROLE_VALIDATOR_MIDDLEWARE: Symbol.for("RoleValidatorMiddleware"),
  HANDLER_RESPONSE: Symbol.for("HandlerResponse"),
  EXPRESS_FRAMEWORK: Symbol.for("Express.js"),
  HASH_SERVICE: Symbol.for("HashService"),
  JWT_SERVICE: Symbol.for("JwtServive"),
  AUTH_SERVICE: Symbol.for("AuthService"),
};
