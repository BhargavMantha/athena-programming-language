import { validSymbols } from 'src/athena-lexer/dictionary';
import { BinaryOperationOnNode } from '../node/binary.operation.class';
import { NumberNode } from '../node/number.node.class';
import { ITokenNumber } from '../types';
interface IParseExpression {
  tokens: ITokenNumber[];
  position: number;
  currentCharacter: ITokenNumber;
}
type mulDivideType = ['AT_MULTIPLY', 'AT_DIVIDE', 'AT_OPERATION'];
type addSubType = ['AT_PLUS', 'AT_MINUS', 'AT_OPERATION'];
type intOrFloat = ['AT_INTEGER', 'AT_FLOAT'];

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
    const isValidType = this.isFactorOrTerm(token, ['AT_INTEGER', 'AT_FLOAT']);
    if (isValidType) {
      this.nextCharacter();
      const numberNode = new NumberNode(token);
      return numberNode.token;
    } else {
      console.error('you have entered a unknown type');
    }
  };
  term = () => {
    return this.commonBinaryOperation(this.factor, [
      'AT_MULTIPLY',
      'AT_DIVIDE',
      'AT_OPERATION'
    ]);
  };

  expr = () => {
    return this.commonBinaryOperation(this.term, [
      'AT_PLUS',
      'AT_MINUS',
      'AT_OPERATION'
    ]);
  };
  isFactorOrTerm = (
    currentCharacter: ITokenNumber,
    operationArr: mulDivideType | addSubType | intOrFloat
  ) =>
    operationArr.some((element: validSymbols) => {
      try {
        if (this.parseExpression.currentCharacter === undefined)
          throw 'this.parseExpression.currentCharacter is undefined';

        return this.parseExpression.currentCharacter.type === element;
      } catch (error) {
        console.log(error);
      }
    });
  commonBinaryOperation(
    factorOrTerm: Function,
    operationArr: mulDivideType | addSubType | intOrFloat
  ) {
    let left = factorOrTerm();
    let stringForm = '';
    let count = 0;
    const currentCharacter = this.parseExpression.currentCharacter;

    while (this.isFactorOrTerm(currentCharacter, operationArr)) {
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
      stringForm += binaryOperationOnNode.stringBuilder();
    }
    return left;
  }

  parse() {
    return this.expr();
  }
}
