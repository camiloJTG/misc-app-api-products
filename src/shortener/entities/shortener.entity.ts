import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  originalUrl: string;

  @Column({ type: 'text', unique: true })
  shortenedUrl: string;

  @Column({ type: 'text', unique: true })
  shortenedHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
