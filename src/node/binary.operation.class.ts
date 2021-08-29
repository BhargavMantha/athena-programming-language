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
    console.log('this.node', this.node);
  }
  getNodeValue() {
    return this.node;
  }
  stringBuilder() {
    return `${this.node['leftNode'].value},${this.node['operationTOPerform'].value},${this.node['rightNode'].value}`;
  }
}
