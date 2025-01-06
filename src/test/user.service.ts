import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<any> {
    await this.userRepository.delete(id);
    return {
      status: 1,
      desc: 'SUCCESS',
      result: null,
      errorDetail: null,
    };
  }
  async createUser(name: string, description: string): Promise<User> {
    const user = this.userRepository.create({ name, description });
    return this.userRepository.save(user);
  }
}
