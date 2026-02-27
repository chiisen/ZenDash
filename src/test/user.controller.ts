import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Member } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  async findAll(): Promise<Member[]> {
    return this.appService.findAll();
  }
  @Post()
  async createUser(@Body() user: Member): Promise<Member> {
    return this.appService.createUser(user.name, user.description, user.sort);
  }
  @Post(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.appService.remove(id);
  }
}
