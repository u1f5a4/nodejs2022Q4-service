import { Injectable } from '@nestjs/common';
import { UserDatabaseService } from 'src/database/userDatabase.service';
import { uuid4 } from 'src/utils/uuid4create';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userDB: UserDatabaseService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = {
      ...dto,
      id: await uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.userDB.create(user);
    const findUser = await this.userDB.findOne(user.id);
    return new User({ ...findUser });
  }

  async findAll(): Promise<User[]> {
    return this.userDB.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userDB.findOne(id);
  }

  async updatePassword(
    id: string,
    updateUserDto: UpdatePasswordUserDto,
  ): Promise<User> {
    return this.userDB.update(id, { password: updateUserDto.newPassword });
  }

  async remove(id: string) {
    return this.userDB.remove(id);
  }
}
