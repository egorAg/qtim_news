import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: TokenService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });

    createdUser.password = undefined;

    const tokens = await this.jwtService.sign(createdUser);

    await this.usersService.updateRefreshToken(createdUser.id, tokens.refresh);

    return tokens;
  }

  public async login(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);

      user.password = undefined;

      return this.jwtService.sign(user);
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateRefToken(token: string) {
    try {
      return this.jwtService.update(token);
    } catch (e) {
      throw new HttpException(`Something goes wrong`, HttpStatus.I_AM_A_TEAPOT);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
