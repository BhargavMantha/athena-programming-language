import { Injectable } from '@nestjs/common';
import readline, { AsyncInterface } from 'readline-promise';
import { AthenaLexerService } from 'src/athena-lexer/athena-lexer.service';

@Injectable()
export class InfinitePrompterService {
  rlp: AsyncInterface;
  constructor() {
    this.rlp = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });
  }
  async initiate() {
    while (true) {
      const text = await this.rlp.questionAsync('Athena:your input=>');
      const lexer = new AthenaLexerService(text);
      console.log(JSON.stringify(lexer.makeTokens(), null, 2));
    }
  }
}
