import { Injectable } from '@nestjs/common';
import readline, { AsyncInterface } from 'readline-promise';
import { AthenaLexerService } from 'src/athena-lexer/athena-lexer.service';
import { AthenaParserService } from 'src/athena-parser/athena-parser.service';

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
      const lexerOutput = lexer.makeTokens();
      if (lexerOutput.error) {
        console.log(JSON.stringify(lexer.makeTokens(), null, 2));
        console.log('Some thing is wrong');
      }
      const tokens = lexerOutput.elements;
      const parser = new AthenaParserService(tokens);
      const abstractSyntaxTree = parser.parse();
      console.log(JSON.stringify(abstractSyntaxTree, null, 2));
    }
  }
}
