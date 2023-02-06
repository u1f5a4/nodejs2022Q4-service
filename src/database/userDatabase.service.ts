import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserDatabaseService {
  private db = [];

  async create(user: CreateUserDto) {
    this.db.push(user);
  }

  async findAll() {
    return this.db;
  }

  async findOne(id: string) {
    return this.db.find((user) => user.id === id);
  }

  async update(id: string, update: Partial<User>) {
    const index = this.db.findIndex((user) => user.id === id);
    const current = this.db[index];
    current.updatedAt = Date.now();
    current.version += 1;
    this.db[index] = { ...current, ...update };
    return this.db[index];
  }

  async remove(id: string) {
    const index = this.db.findIndex((user) => user.id === id);
    this.db.splice(index, 1);
  }
}
