import { CustomError } from "./Error";

export class ForbidenException extends CustomError {
  constructor(str: string) {
    super(str, 403);
  }
}
