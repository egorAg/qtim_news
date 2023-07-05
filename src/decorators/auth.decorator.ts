import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

export const Auth = () => applyDecorators(UseGuards(JwtGuard));
