export type PayloadType = { [x: string]: any };

export interface IJwtService {
  get(payload: PayloadType): string;
  validate(str: string): PayloadType | string;
}
