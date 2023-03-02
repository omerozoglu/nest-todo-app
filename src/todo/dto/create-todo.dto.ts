import { IsOptional, IsUUID } from 'class-validator';
<<<<<<< HEAD
import { IsDate } from 'class-validator/types/decorator/typechecker/IsDate';
=======
>>>>>>> 2d2e0d076d5f1e3509305ad26bba404da3428c61
import { Entity, Column } from 'typeorm';

@Entity()
export class CreateTodoDto {
  @Column({ type: 'varchar', length: 256, name: 'task_name' })
  taskName: string;
  @IsOptional()
  @Column({ type: 'varchar', length: 256 })
  description: string;
  @Column({ type: 'varchar', length: 256 })
  priority: string;
  @IsDate()
  @Column({ type: 'date', name: 'due_date' })
  dueDate: Date;
  @IsOptional()
  @IsDate()
  @Column({ type: 'date', name: 'completed_date' })
  completedDate: Date;
  @Column({ type: 'boolean' })
  status: boolean;
  @IsOptional()
  @Column({ type: 'varchar', length: 256 })
  category: string;
  @IsOptional()
  @IsUUID()
  @Column({ type: 'varchar', length: 256, name: 'assigned_to' })
  assignedTo: string;
  @IsUUID()
  @Column({
    type: 'varchar',
    length: 256,
    name: 'created_by',
  })
  createdBy: string;
}
