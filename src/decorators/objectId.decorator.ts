import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // console.log(Types.ObjectId.isValid(value));
          // console.log(Types.ObjectId.isValid('66adfb08203bb02f8f94fff9'));

          return Types.ObjectId.isValid(value); // check if the value is a valid ObjectId
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ObjectId`;
        },
      },
    });
  };
}
