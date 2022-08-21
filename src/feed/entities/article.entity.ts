import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column('text', { array: true, nullable: true })
  tags: Array<string>;

  @Column({ nullable: true })
  storyTitle: string;

  @AfterInsert()
  logInsert() {
    console.log(`created post with id ${this.id} `);
  }
}
