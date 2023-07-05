import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/models/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async sign(u: User) {
    return {
      access: await this.jwtService.signAsync(
        {
          id: u.id,
          email: u.email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS') ?? '$up3r$3cr3t',
          expiresIn: '3m',
        },
      ),
      refresh: await this.jwtService.signAsync(
        {
          id: u.id,
          email: u.email,
        },
        {
          secret: this.configService.get<string>('JWT_REF') ?? '$up3r$3cr3t',
          expiresIn: '3d',
        },
      ),
    };
  }

  public async update(token: string) {
    const payload = await this.jwtService.decode(token);

    if (typeof payload === 'string' || !payload?.id || !payload?.email) {
      throw new HttpException(`Incorrect token`, HttpStatus.BAD_REQUEST);
    }

    const transformed = <User>{
      id: payload.id,
      email: payload.email,
    };

    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REF') ?? '$up3r$3cr3t',
      });

      return this.sign(transformed);
    } catch (e) {
      throw new HttpException(`Incorrect token`, HttpStatus.BAD_REQUEST);
    }
  }
}
