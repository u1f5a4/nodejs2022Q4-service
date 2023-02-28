import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';
import { UUID4 } from 'src/utils/UUID4';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID4) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  async updatePassword(
    @Param() { id }: UUID4,
    @Body() updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    }
    if (user.password !== updatePasswordUserDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        StatusCodes.FORBIDDEN,
      );
    }

    return new User({
      ...(await this.userService.updatePassword(id, updatePasswordUserDto)),
    });
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: UUID4) {
    if (!(await this.userService.findOne(id))) {
      throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    }

    return this.userService.remove(id);
  }
}
