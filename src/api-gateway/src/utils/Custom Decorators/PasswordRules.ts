import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'passwordRules', async: false })
export class PasswordRules implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    console.log(args);
    return text.length > 8 /*&&*/;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    return `${args.value} is an invalid password`;
  }
}
