import { IsOptional } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { IsUnique } from '../../../common/validators/my-custom.validator';
import { Todo } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsUnique(Todo, 'taskName')
  taskName: string;
  @IsOptional()
  description: string;
  @IsOptional()
  priority: string;
  @IsOptional()
  dueDate: Date;
  @IsOptional()
  completedDate: Date;
  @Column({ type: 'boolean' })
  status: boolean;
  @IsOptional()
  category: string;
  @IsOptional()
  assignedTo: string;
  @IsOptional()
  createdBy: string;
}
