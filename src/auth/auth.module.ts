import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UserModule, JwtModule.register({}), TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
