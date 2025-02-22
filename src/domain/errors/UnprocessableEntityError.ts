import { CustomError } from "./Error";

export class UnprocessableEntityError extends CustomError {
  constructor(text: string) {
    super(text, 422);
  }
}
