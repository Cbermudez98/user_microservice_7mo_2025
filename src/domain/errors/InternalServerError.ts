import { CustomError } from "./Error";

export class InternalServerError extends CustomError {
  constructor(text: string) {
    super(text, 500);
  }
}
