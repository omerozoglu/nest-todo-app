import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('languages')
export class Language extends BaseEntity {
  @Column({ unique: true })
  code: string;
  @Column()
  name: string;
  @Column()
  status: boolean;
}
