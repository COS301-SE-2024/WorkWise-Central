import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidSouthAfricanID', async: false })
export class IsValidSouthAfricanID implements ValidatorConstraintInterface {
  validate(id: string, args: ValidationArguments) {
    console.log('args', args);
    if (id.length !== 13 || !/^\d+$/.test(id)) {
      return false;
    }

    const digits = id.split('').map(Number);
    const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((sum, digit) => sum + digit, 0);
    const evenDigits = digits.filter((_, i) => i % 2 !== 0).join('');
    const evenSum = evenDigits
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const totalSum = oddSum + evenSum;
    return totalSum % 10 === 0;
  }

  defaultMessage(args: ValidationArguments) {
    console.log('args', args);
    return 'ID number ($value) is not valid!';
  }
}
