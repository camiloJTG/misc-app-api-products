import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GenPass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  includeUppercase: boolean;

  @Column({ type: 'boolean', default: false })
  includeLowercase: boolean;

  @Column({ type: 'boolean', default: false })
  includeNumbers: boolean;

  @Column({ type: 'boolean', default: false })
  includeSpecialCharacters: boolean;

  @Column('numeric')
  length: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
