export interface IToken {
  type: string;
  value: any;
}

export interface ITokenNumber extends IToken {
  value: number;
}
