export class validationResult {
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
