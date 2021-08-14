import { Injectable } from '@nestjs/common';
import { IToken } from 'src/types';

export class AthenaTokenService {
  self: IToken = { type: '', value: '' };
  constructor(type: string, value: any) {
    this.self.type = type;
    this.self.value = value;
  }
  representation() {
    if (this.self.value) {
      return `${this.self.type}:${this.self.value}`;
    } else {
      return `${this.self.type}`;
    }
  }
  returnToken() {
    return this.self;
  }
}
