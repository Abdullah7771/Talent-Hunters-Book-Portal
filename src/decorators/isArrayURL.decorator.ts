import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArrayOfUrls(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfUrls',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.every(
              (val) =>
                typeof val === 'string' &&
                /^(https?:\/\/)[^\s$.?#].[^\s]*$/.test(val),
            )
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Each element of the array must be a valid URL';
        },
      },
    });
  };
}
