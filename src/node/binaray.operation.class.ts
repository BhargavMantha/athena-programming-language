import { IToken, ITokenNumber } from 'src/types';

export interface INode {
  leftNode: ITokenNumber;
  operationTOPerform: string;
  rightNode: ITokenNumber;
}
export class BinaryOperationOnNode {
  node = {};
  constructor(
    leftNode: ITokenNumber,
    operationTOPerform: IToken,
    rightNode: ITokenNumber
  ) {
    this.node['leftNode'] = leftNode;
    this.node['operationTOPerform'] = operationTOPerform;
    this.node['rightNode'] = rightNode;
  }
  get nodeValue() {
    return this.node;
  }
}
