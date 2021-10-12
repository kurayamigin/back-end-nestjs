import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { DtoUser } from './user.dto';

@Injectable()
export class UserMapper {
  toDto(user: User): DtoUser {
    return new DtoUser(
      user.id,
      user.username,
      user.password,
      user.email,
      user.firstname,
      user.lastname,
      user.phone,
    );
  }
}
