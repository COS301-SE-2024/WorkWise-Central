import { Exception } from 'handlebars';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class ValidationResult {
  public _isValid: boolean;
  public _message?: string;

  constructor(isValid: boolean, message?: string) {
    this._isValid = isValid;
    if (message) this._message = message;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  set isValid(value: boolean) {
    this._isValid = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

export class ValidationResultWithException {
  public _isValid: boolean;
  public _exception?: Exception | NotFoundException | ConflictException | InternalServerErrorException;

  constructor(
    isValid: boolean,
    exception?: Exception | NotFoundException | ConflictException | InternalServerErrorException,
  ) {
    this._isValid = isValid;
    if (exception) this._exception = exception;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  set isValid(value: boolean) {
    this._isValid = value;
  }

  get message(): Exception | NotFoundException | ConflictException | InternalServerErrorException {
    return this._exception;
  }

  set exception(value: Exception | NotFoundException | ConflictException | InternalServerErrorException) {
    this._exception = value;
  }
}
