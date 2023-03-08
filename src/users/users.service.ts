import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import {
  UserCreateDTO,
  UserDTO,
  UserWithExpensesDTO,
  UserWithPasswordDTO,
} from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async findAll(options: FindManyOptions<UserDTO> = {}): Promise<UserDTO[]> {
    const users = await this.repository.find(options);
    return users.map((user) => {
      if (!user.active) {
        return;
      }
      delete user.password;
      return user;
    });
  }

  async findOne(
    id: number,
    relations = { expenses: false },
  ): Promise<UserWithExpensesDTO> {
    const user = await this.repository.findOne({
      where: { id },
      relations,
    });
    if (!user.active) {
      throw new Error('User not found');
    }
    delete user.password;
    return user;
  }

  async findOneByUsername(username: string): Promise<UserWithPasswordDTO> {
    return this.repository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<UserWithPasswordDTO> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: UserCreateDTO): Promise<UserDTO> {
    const newUser = await this.repository.save(user).catch(() => {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    });
    delete newUser.password;
    return newUser;
  }

  async update(id: number, user: UserCreateDTO): Promise<UserDTO> {
    const selectedUser = await this.repository.findOne({ where: { id } });
    if (!selectedUser.active) {
      throw new Error('User not found');
    }
    delete user.username;
    const updatedUser = await this.repository.save({
      id,
      ...user,
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    user.active = false;
  }
}
