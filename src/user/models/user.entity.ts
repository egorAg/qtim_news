import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { News } from '../../news/models/news.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
  })
  refToken?: string;

  @OneToMany(() => News, (n: News) => n.author)
  news: News[];
}
