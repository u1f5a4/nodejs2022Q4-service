import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value) => value,
      from: (value) => Date.parse(new Date(value).toISOString()),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to: (value) => value,
      from: (value) => Date.parse(new Date(value).toISOString()),
    },
  })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
