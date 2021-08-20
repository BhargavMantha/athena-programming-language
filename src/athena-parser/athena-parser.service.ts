import { BinaryOperationOnNode } from '../node/binary.operation.class';
import { NumberNode } from '../node/number.node.class';
import { ITokenNumber } from '../types';
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
    console.log(this.parseExpression);
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
      const numberNode = new NumberNode(token);
      console.log('numberNode', numberNode);
      return numberNode;
    } else {
      console.log('you have entered a unknown value');
    }
  };
  term = () => {
    return this.commonBinaryOperation(this.factor, [
      'AT_MULTIPLY',
      'AT_DIVIDE'
    ]);
  };

  expr = () => {
    return this.commonBinaryOperation(this.term, ['AT_PLUS', 'AT_MINUS']);
  };
  isFactorOrTerm = (operationArr) =>
    operationArr.some(
      (element) => this.parseExpression.currentCharacter.value === element
    );
  commonBinaryOperation(
    factorOrTerm: Function,
    operationArr: mulDivideType | addSubType
  ) {
    let left = factorOrTerm();
    let stringForm = '';
    let count = 0;
    while (this.isFactorOrTerm(operationArr)) {
      const operationTOPerformToken = this.parseExpression.currentCharacter;
      this.nextCharacter();
      count += 1;
      console.log('___count___', count);
      console.log(this.parseExpression);
      const right = factorOrTerm();
      const binaryOperationOnNode = new BinaryOperationOnNode(
        left,
        operationTOPerformToken,
        right
      );
      left = binaryOperationOnNode.getNodeValue();
      stringForm = binaryOperationOnNode.stringBuilder();
    }
    return { left, stringForm };
  }

  parse() {
    return this.expr();
  }
}
