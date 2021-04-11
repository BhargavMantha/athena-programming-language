import { Injectable } from '@nestjs/common';

export class AthenaErrorService {
  errorName: string;
  details: string;
  constructor(errorName: string, details: string) {
    this.errorName = errorName;
    this.details = details;
  }
  errorResult() {
    return `${this.errorName}:${this.details}`;
  }
}
export class IllegalCharacterError extends AthenaErrorService {
  constructor(details: string) {
    super('Illegal Character', details);
  }
}
