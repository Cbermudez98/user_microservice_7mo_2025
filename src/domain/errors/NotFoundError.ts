import { CustomError } from "./Error";

export class NotFoundError extends CustomError {
  constructor(text: string) {
    super(text, 404);
  }
}
