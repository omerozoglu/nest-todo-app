import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ nullable: true })
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
