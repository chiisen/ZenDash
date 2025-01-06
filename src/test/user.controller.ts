import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.appService.createUser(user.name, user.description);
  }
  @Post(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.appService.remove(id);
  }
}
