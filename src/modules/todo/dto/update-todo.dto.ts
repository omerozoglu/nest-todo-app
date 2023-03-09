import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

import { Entity } from 'typeorm';

@Entity()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
