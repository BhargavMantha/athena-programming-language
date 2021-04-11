import { Injectable } from '@nestjs/common';

export class AthenaTokenService {
  self: { type: string; value: any } = { type: '', value: '' };
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
}
