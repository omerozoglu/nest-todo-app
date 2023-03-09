import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo extends BaseEntity {
  @Column({ name: 'task_name' })
  taskName: string;
  @Column()
  description: string;
  @Column()
  priority: string;
  @Column({ name: 'due_date' })
  dueDate: Date;
  @Column({ name: 'completed_date' })
  completedDate: Date;
  @Column()
  status: boolean;
  @Column()
  category: string;
  @Column({ name: 'assigned_to' })
  assignedTo: string;
  @Column({ name: 'created_by' })
  createdBy: string;
}
