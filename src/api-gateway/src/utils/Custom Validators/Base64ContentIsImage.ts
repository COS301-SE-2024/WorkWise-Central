import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'Base64ContentIsImage' })
export class Base64ContentIsImage implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    console.log(args);
    const dataUriRegex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/i;
    if (!dataUriRegex.test(value)) {
      return false;
    }
    // Extract the actual base64 content
    const base64Content = value.replace(dataUriRegex, '');
    // Test that conversion is successful
    try {
      Buffer.from(base64Content, 'base64');
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return `Image content is not a valid data URI base64 string`;
  }
}
