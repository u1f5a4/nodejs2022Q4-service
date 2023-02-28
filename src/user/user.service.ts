import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.userRepository.create(dto));
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updatePassword(id: string, dto: UpdatePasswordUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (user.password === dto.oldPassword) {
      return this.userRepository.save({ ...user, password: dto.newPassword });
    } else return null;
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
