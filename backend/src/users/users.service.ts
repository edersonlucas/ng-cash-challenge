import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    const createUser = {
      ...userDto,
      id: uuid(),
    };
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  async findByAccountId(accountId: string) {
    const user = await this.userRepository.findOneBy({ accountId });
    return user;
  }

  async findByUsernameAndId(username: string, id: string) {
    const user = await this.userRepository.findOne({ where: { username, id } });
    return user;
  }
}
