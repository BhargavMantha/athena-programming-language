import { Injectable } from '@nestjs/common';
import { IllegalCharacterError } from 'src/athena-error/athena-error.service';
import { AthenaTokenService } from 'src/athena-token/athena-token.service';
import { IToken } from 'src/types';
import { athenaTypeOfDigit, lexerDictionary } from './dictionary';

export class AthenaLexerService {
  expression: {
    textArray: string[];
    position: number;
    currentCharacter: string;
  } = {
    textArray: [],
    position: -1,
    currentCharacter: undefined
  };

  constructor(text: string) {
    this.expression.textArray = [...text];
    this.nextCharacter();
  }
  nextCharacter = () => {
    this.expression.position += 1;
    this.expression.currentCharacter =
      this.expression.position < this.expression.textArray.length
        ? this.expression.textArray[this.expression.position]
        : undefined;
  };
  elementInChecker(elementTotCheckAgainst: string[], element: any) {
    return elementTotCheckAgainst.some(
      (eachElement) => eachElement === element
    );
  }
  makeTokens() {
    const tokens: IToken[] = [];
    while (this.expression.currentCharacter !== undefined) {
      if (this.elementInChecker([...'\t '], this.expression.currentCharacter)) {
        this.nextCharacter();
      } else if (
        this.elementInChecker(
          [...lexerDictionary.DIGITS],
          this.expression.currentCharacter
        )
      ) {
        tokens.push(this.makeNumbers());
      } else if (
        lexerDictionary.hasOwnProperty(this.expression.currentCharacter)
      ) {
        const operationToken = new AthenaTokenService(
          athenaTypeOfDigit.operation,
          lexerDictionary[this.expression.currentCharacter]
        ).returnToken();
        tokens.push(operationToken);
        this.nextCharacter();
      } else {
        const char = this.expression.currentCharacter;
        this.nextCharacter();
        return { elements: [], error: new IllegalCharacterError(`${char}`) };
      }
    }
    return { elements: tokens, error: undefined };
  }
  makeNumbers(): IToken {
    let numStr = '';
    let dotCount = 0;
    while (
      this.expression.currentCharacter !== undefined &&
      this.elementInChecker(
        [...lexerDictionary.DIGITS],
        this.expression.currentCharacter
      )
    ) {
      if (this.expression.currentCharacter === '.') {
        if (dotCount === 1) {
          break;
        }
        dotCount += 1;
        numStr += '.';
      } else {
        numStr += this.expression.currentCharacter;
      }
      this.nextCharacter();
    }
    if (dotCount == 0) {
      return new AthenaTokenService(
        athenaTypeOfDigit.int,
        parseInt(numStr)
      ).returnToken();
    } else {
      return new AthenaTokenService(
        athenaTypeOfDigit.float,
        parseFloat(numStr)
      ).returnToken();
    }
  }
}
