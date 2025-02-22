export class CustomError extends Error {
  public status: number;
  constructor(text: string, status: number) {
    super(text);
    this.status = status;
  }
}
