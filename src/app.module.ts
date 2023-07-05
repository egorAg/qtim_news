import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TokenService } from './token/token.service';
import * as Joi from '@hapi/joi';
import { TokenModule } from './token/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS: Joi.string(),
        JWT_REF: Joi.string(),
      }),
    }),
    UserModule,
    AuthModule,
    NewsModule,
    DatabaseModule,
    TokenModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [TokenService],
})
export class AppModule {}
