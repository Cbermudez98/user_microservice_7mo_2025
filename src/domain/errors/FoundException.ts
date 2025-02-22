import { CustomError } from "./Error";

export class FoundExceptionError extends CustomError {
  constructor(text: string) {
    super(text, 409);
  }
}
