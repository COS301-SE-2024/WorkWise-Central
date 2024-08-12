import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'registrationNumber', async: false })
export class RegistrationNumber implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (value === '') {
      return true;
    }
    console.log(args);
    const regex = /^\d{4}\/\d{6}\/\d{2}$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `The value "${args.value}" does not match the required format (YYYY/NNNNNN/NN).`;
  }
}

@ValidatorConstraint({ name: 'registrationNumber', async: false })
export class VatNumber implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    console.log(args);
    if (value === '') {
      return true;
    }
    return value.length === 10;
  }

  defaultMessage(args: ValidationArguments): string {
    return `The value "${args.value}" is not 10 digits long`;
  }
}
