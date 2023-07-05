import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        `Auth header not provided`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      jwt.verify(token, process.env.JWT_ACCESS ?? '$up3r$3cr3t');
      return true;
    } catch (e) {
      throw new HttpException(
        `Auth header not provided`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers;
    if (!headers['authorization']) {
      return undefined;
    }
    const [type, token] = request.headers?.['authorization'].split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
