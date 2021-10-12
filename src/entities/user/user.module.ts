import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserMapper } from './dto/user.mapper';
import { SessionService } from '../session/session.service';
import { Session } from '../session/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  controllers: [UserController],
  providers: [UserService, UserMapper, SessionService],
  exports: [TypeOrmModule],
})
export class UserModule {}
