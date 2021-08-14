import { IToken, ITokenNumber } from '../types';

export class NumberNode {
  initializedToken: ITokenNumber;
  get token() {
    return this.initializedToken;
  }
  constructor(token: ITokenNumber) {
    this.initializedToken = token;
  }
}
