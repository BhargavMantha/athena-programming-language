import { BinaryOperationOnNode } from 'src/node/binaray.operation.class';
import { NumberNode } from 'src/node/number.node.class';
import { IToken, ITokenNumber } from 'src/types';
interface IParseExpression {
  tokens: ITokenNumber[];
  position: number;
  currentCharacter: ITokenNumber;
}
type mulDivideType = ['AT_MULTIPLY', 'AT_DIVIDE'];
type addSubType = ['AT_PLUS', 'AT_MINUS'];

export class AthenaParserService {
  parseExpression: IParseExpression = {
    tokens: [],
    position: -1,
    currentCharacter: undefined
  };

  constructor(tokens: ITokenNumber[]) {
    this.parseExpression.tokens = tokens;
    this.nextCharacter();
  }
  nextCharacter() {
    this.parseExpression.position += 1;
    this.parseExpression.currentCharacter =
      this.parseExpression.position < this.parseExpression.tokens.length
        ? this.parseExpression.tokens[this.parseExpression.position]
        : undefined;
  }
  factor = () => {
    const token = this.parseExpression.currentCharacter;
    const isValidType = ['AT_INTEGER', 'AT_FLOAT'].some(
      (element) => token.type === element
    );
    if (isValidType) {
      this.nextCharacter();
      return new NumberNode(token).token;
    }
  };
  term() {
    return this.commonBinaryOperation(this.factor, [
      'AT_MULTIPLY',
      'AT_DIVIDE'
    ]);
  }

  expr() {
    return this.commonBinaryOperation(this.factor, ['AT_PLUS', 'AT_MINUS']);
  }

  commonBinaryOperation(
    factor: Function,
    OperationArr: mulDivideType | addSubType
  ) {
    let left = factor();
    const isMulOrDivide = OperationArr.some(
      (element) => this.parseExpression.currentCharacter.type === element
    );
    while (isMulOrDivide) {
      const operationTOPerform = this.parseExpression.currentCharacter;
      this.nextCharacter();
      const right = this.parseExpression.currentCharacter;
      const binaryOperationOnNode = new BinaryOperationOnNode(
        left,
        operationTOPerform,
        right
      );
      left = binaryOperationOnNode;
    }
    return left;
  }

  parse() {
    return this.expr();
  }
}
