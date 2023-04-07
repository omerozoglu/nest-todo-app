import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Connection, DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'demo',
  synchronize: true,
});

appDataSource.initialize();

@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [entity, column] = args.constraints;

    const repository = appDataSource.getRepository(entity);

    const result = await repository.findOne({ [column]: value });

    if (result) return false;

    return false;
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
  console.log('entity', entity);
  console.log('column', column);
  console.log('validationOptions', validationOptions);

  return function (object: Object, propertyName: string) {
    console.log('object', object);
    console.log('propertyName', propertyName);

    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: IsUniqueConstraint,
    });
  };
}
