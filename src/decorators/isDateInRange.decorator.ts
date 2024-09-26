import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateInRange', async: false })
export class IsDateInRangeConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const date = new Date(value);
    const today = new Date('1900-01-01');
    const maxDate = new Date();

    return date >= today && date <= maxDate;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Date of Injury must be between 1900-01-01 and current Date';
  }
}

export function IsDateInRange(validationOptions?: any) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateInRangeConstraint,
    });
  };
}
