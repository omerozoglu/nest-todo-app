import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;
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
  @Column({ type: 'varchar', length: 256, name: 'assigned_to' })
  assignedTo: string;
  @Column({
    type: 'varchar',
    length: 256,
    name: 'created_by',
  })
  createdBy: string;
}
