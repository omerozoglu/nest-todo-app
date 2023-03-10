import { BaseEntity } from 'src/common/base-entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Blog } from './blog.entity';

@Entity('blog_translations')
export class BlogTranslation extends BaseEntity {
  @Column({ name: 'blog_id' })
  blogId: string;

  @Column({ name: 'language_id' })
  languageId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Blog, (blog) => blog.blogTranslations)
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;
}
