import { Exclude } from 'class-transformer';

@Exclude()
export class DtoUser {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    phone: string,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
  }
}
