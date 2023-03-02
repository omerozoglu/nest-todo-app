import { Entity, Column } from 'typeorm';

@Entity()
export class CreateTodoDto {
  @Column({ type: 'varchar', length: 256, name: 'task_name' })
  taskName: string;
  @Column({ type: 'varchar', length: 256 })
  description: string;
  @Column({ type: 'varchar', length: 256 })
  priority: string;
  @Column({ type: 'date', name: 'due_date' })
  dueDate: Date;
  @Column({ type: 'date', name: 'completed_date' })
  completedDate: Date;
  @Column({ type: 'boolean' })
  status: boolean;
  @Column({ type: 'varchar', length: 256 })
  category: string;
}
