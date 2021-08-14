import { Injectable } from '@nestjs/common';
import { IllegalCharacterError } from 'src/athena-error/athena-error.service';
import { AthenaTokenService } from 'src/athena-token/athena-token.service';
import { IToken } from 'src/types';
import { athenaTypeOfDigit, lexerDictionary } from './dictionary';

export class AthenaLexerService {
  self: { text: string[]; position: number; currentCharacter: string } = {
    text: [],
    position: -1,
    currentCharacter: undefined
  };

  constructor(text: string) {
    this.self.text = text.split('');
    this.nextCharacter();
  }
  nextCharacter() {
    this.self.position += 1;
    this.self.currentCharacter =
      this.self.position < this.self.text.length
        ? this.self.text[this.self.position]
        : undefined;
  }
  elementInChecker(elementTotCheckAgainst: string[], element: any) {
    return elementTotCheckAgainst.some(
      (eachElement) => eachElement === element
    );
  }
  makeTokens() {
    const tokens: IToken[] = [];
    while (this.self.currentCharacter !== undefined) {
      if (this.elementInChecker([...'\t '], this.self.currentCharacter)) {
        this.nextCharacter();
      } else if (
        this.elementInChecker(
          [...lexerDictionary.DIGITS],
          this.self.currentCharacter
        )
      ) {
        tokens.push(this.makeNumbers());
        this.nextCharacter();
      } else if (lexerDictionary[this.self.currentCharacter]) {
        const operationToken = new AthenaTokenService(
          athenaTypeOfDigit.operation,
          lexerDictionary[this.self.currentCharacter]
        ).returnToken();
        tokens.push(operationToken);
        this.nextCharacter();
      } else {
        const char = this.self.currentCharacter;
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
      this.self.currentCharacter !== undefined &&
      this.elementInChecker(
        [...lexerDictionary.DIGITS],
        this.self.currentCharacter
      )
    ) {
      if (this.self.currentCharacter === '.') {
        if (dotCount === 1) {
          break;
        }
        dotCount += 1;
        numStr += '.';
      } else {
        numStr += this.self.currentCharacter;
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
