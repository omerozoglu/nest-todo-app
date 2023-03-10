import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BlogTranslation } from './blog-translation';

@Entity({ name: 'blogs' })
export class Blog extends BaseEntity {
  @Column()
  status: boolean;

  @OneToMany(() => BlogTranslation, (blogTranslation) => blogTranslation.blog)
  blogTranslations: BlogTranslation[];
}
