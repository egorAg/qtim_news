import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const authToken: string | undefined = request.headers.authorization;

  if (!authToken)
    throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);

  const splited = authToken.split(' ');

  if (splited[0] !== 'Bearer')
    throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);

  const payload = jwt.decode(splited[1]) as {
    id: number;
    email: string;
    exp: number;
    iat: number;
  };

  if (payload.exp * 1000 > payload.iat * 1000) {
    return payload.id;
  } else {
    throw new HttpException(`Token expired`, HttpStatus.UNAUTHORIZED);
  }
});
