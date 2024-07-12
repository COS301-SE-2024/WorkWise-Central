import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'registrationNumber', async: false })
export class RegistrationNumber implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    console.log(args);
    const regex = /^\d{4}\/\d{6}\/\d{2}$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `The value "${args.value}" does not match the required format (YYYY/NNNNNN/NN).`;
  }
}
