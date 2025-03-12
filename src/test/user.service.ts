import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Member)
    private userRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<Member> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(sort: number): Promise<any> {
    await this.userRepository.delete(sort);
    return {
      status: 1,
      desc: 'SUCCESS',
      result: null,
      errorDetail: null,
    };
  }
  async createUser(
    name: string,
    description: string,
    sort: number,
  ): Promise<Member> {
    const user = this.userRepository.create({ name, description, sort });
    return this.userRepository.save(user);
  }
}
