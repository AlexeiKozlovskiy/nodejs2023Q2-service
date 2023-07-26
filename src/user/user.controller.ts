import {
  Controller,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { User, UserResp } from '../types/types';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { MessageStatus } from '../types/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) ID: string,
  ): Promise<UserResp> {
    const getUser = await this.userService.getUser(ID);
    if (!getUser) {
      throw new HttpException(
        MessageStatus.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, login, version, createdAt, updatedAt } = getUser;
    return { id, login, version, createdAt, updatedAt };
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) dto: CreateUserDto,
  ): Promise<UserResp> {
    const createUser = await this.userService.createUser(dto);
    const { id, login, version, createdAt, updatedAt } = createUser;
    return { id, login, version, createdAt, updatedAt };
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) ID: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResp> {
    const user = await this.userService.getUser(ID);
    if (!user) {
      throw new HttpException(
        MessageStatus.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        MessageStatus.USER_PASSWORD_IS_INVALID,
        HttpStatus.FORBIDDEN,
      );
    }
    const userUpdate = await this.userService.updateUserPassword(
      user.id,
      updatePasswordDto,
    );
    const { id, login, version, createdAt, updatedAt } = userUpdate;
    return { id, login, version, createdAt, updatedAt };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException(
        MessageStatus.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    this.userService.deleteUser(user.id);
    return;
  }
}
