import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update}

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
