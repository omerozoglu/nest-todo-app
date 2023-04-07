import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

import { Entity } from 'typeorm';
import { IsUnique } from '../../../common/validators/my-custom.validator';
import { Todo } from '../entities/todo.entity';

@Entity()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsUnique(Todo, 'taskName')
  test: string;
}
