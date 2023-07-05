import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/models/user.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => User, (u: User) => u.news)
  author: User;
}
