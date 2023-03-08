import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { UserCreateDTO, UserDTO, UserWithExpensesDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiResponse({ status: 200, type: UserDTO, isArray: true })
  @Get()
  async findAll(
    @Query()
    options: FindManyOptions<UserDTO> = {},
  ): Promise<UserDTO[]> {
    return this.service.findAll(options);
  }

  @ApiResponse({ status: 200, type: UserWithExpensesDTO })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserWithExpensesDTO> {
    return this.service.findOne(id, { expenses: true });
  }

  @ApiResponse({ status: 200, type: UserDTO })
  @Post()
  async create(@Body() userData: UserCreateDTO): Promise<UserDTO> {
    return this.service.create(userData);
  }

  @ApiResponse({ status: 200, type: UserDTO })
  @Put(':id')
  async update(@Body() userData: User): Promise<UserDTO> {
    return this.service.update(userData.id, userData);
  }
}
