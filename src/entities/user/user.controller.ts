import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { DtoUser } from './dto/user.dto';
import { UserService } from './user.service';
import { CredentialsBean } from './dto/credentials.bean';
import { SessionService } from '../session/session.service';
import { ResponseCodes } from '../../enums/responses-code.enum';
import { CustomResponse } from '../../shared/custom-responde.model';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('/signup')
  async signup(@Body('data') user: DtoUser) {
    //validate username and email
    const existUsername = await this.userService.query({
      username: user.username,
    });
    const existEmail = await this.userService.query({ email: user.email });
    if (existUsername.length) {
      return new CustomResponse(
        user,
        ResponseCodes.INVALID_DATA,
        'username already in use',
      );
    }
    if (existEmail.length) {
      return new CustomResponse(
        user,
        ResponseCodes.INVALID_DATA,
        'email already in use',
      );
    } else {
      user = await this.userService.create(user);
      return new CustomResponse(user, ResponseCodes.SUCCESS, 'Signed up!');
    }
  }

  @Post('/login')
  async login(@Body('data') credentials: CredentialsBean) {
    const user = await this.userService.findOne({
      username: credentials.username,
      password: credentials.password,
    });
    if (!user)
      return new CustomResponse(
        credentials,
        ResponseCodes.INVALID_DATA,
        'Invalid credentials',
      );

    //already logged
    const onsession = await this.sessionService.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    if (!onsession || !onsession.token) {
      const session = await this.sessionService.initSession(user);
      credentials.token = session.token;
      return new CustomResponse(
        credentials,
        ResponseCodes.SUCCESS,
        'Logged in',
      );
    }
    credentials.token = onsession.token;
    return new CustomResponse(credentials, ResponseCodes.SUCCESS, 'Logged in');
  }

  @Post('/logout')
  async logout(@Body('data') username: string) {
    const user = await this.userService.findOne({
      username: username,
    });
    const credentials = { username: user.username, token: '' };
    if (!user)
      return new CustomResponse(
        credentials,
        ResponseCodes.INVALID_DATA,
        'Invalid credentials',
      );

    const onsession = await this.sessionService.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    if (onsession) {
      await this.sessionService.destroySession(user.id);
    }
    credentials.username = '';
    credentials.token = '';
    return new CustomResponse(credentials, ResponseCodes.SUCCESS, 'Logged out');
  }

  @Post('/authenticate')
  async authenticate(
    @Body('data') credentials: CredentialsBean,
  ): Promise<CustomResponse> {
    const session = await this.sessionService.findOne({
      where: { user: { username: credentials.username } },
      relations: ['user'],
    });
    if (!session || !session.token)
      return new CustomResponse(
        credentials,
        ResponseCodes.INVALID_DATA,
        'User session not found',
      );
    credentials.token = session.token;
    return new CustomResponse(
      credentials,
      ResponseCodes.SUCCESS,
      'Authentication completed',
    );
  }

  @Post('/profile/:username')
  async get(@Param('username') username: string) {
    const user = await this.userService.findOne({ username: username });
    if (!user) return new CustomResponse(username, ResponseCodes.INVALID_DATA, "This user doesn't exist");
    delete user.password;
    return user;
  }
}
