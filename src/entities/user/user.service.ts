import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoUser } from './dto/user.dto';
import { UserMapper } from './dto/user.mapper';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userMapper: UserMapper,
  ) {}

  async query(options) {
    return this.userRepository.find(options);
  }

  async findOne(options) {
    return this.userRepository.findOne(options);
  }

  async create(userDto: DtoUser): Promise<DtoUser> {
    const user = await this.userRepository.save(userDto);
    return this.userMapper.toDto(user);
  }
}
