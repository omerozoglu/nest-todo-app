import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Connection } from 'typeorm';

export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly connection: Connection) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity, column] = args.constraints;

    const repository = this.connection.getRepository(entity);
    const result = await repository.findOne({ [column]: value });

    if (result) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} already exists for ${args.constraints[1]}`;
  }
}

export function IsUnique(
  entity: Function,
  column: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: IsUniqueConstraint,
    });
  };
}
