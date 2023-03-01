import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  uuid: string;
  @Column({ type: 'varchar', length: 256, name: 'task_name' })
  taskName: string;
  @Column({ type: 'varchar', length: 256 })
  description: string;
  @Column({ type: 'varchar', length: 256 })
  priority: string;
  @Column({ type: 'date', name: 'due_date' })
  dueDate: Date;
  @Column({ type: 'date', name: 'complated_date' })
  complatedDate: Date;
  @Column({ type: 'boolean' })
  status: boolean;
  @Column({ type: 'varchar', length: 256 })
  category: string;
}
