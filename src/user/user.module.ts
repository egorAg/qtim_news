import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
