import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity('menus')
export class Menu extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'parent_id' })
  parentId: number;

  @OneToMany(() => Menu, (menu) => menu.parent)
  @JoinColumn({ name: 'parent_id' })
  parent: Menu[];
}
