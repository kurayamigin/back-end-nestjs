import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../book/book.entity';
import { Repository } from 'typeorm';
import { BookMapper } from '../book/dto/bookMapper';
import { Session } from './session.entity';
import { User } from '../user/user.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async query(options): Promise<Session[]> {
    return this.sessionRepository.find(options);
  }

  async findOne(options): Promise<Session> {
    return this.sessionRepository.findOne(options);
  }

  async findOneByUserId(userId): Promise<Session> {
    return this.sessionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async initSession(user: User): Promise<Session> {
    const token = randomStringGenerator();
    return this.sessionRepository.save({ user: user, token: token });
  }

  async destroySession(userId: number) {
    return this.sessionRepository.delete({ user: { id: userId } });
  }
}
