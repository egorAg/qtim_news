import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    description: 'Create new user',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        access: {
          type: 'string',
          description: 'Access token, lifetime 3 minutes',
        },
        refresh: {
          type: 'string',
          description: 'Refresh token, lifetime 3 days',
        },
      },
    },
  })
  @Post('register')
  public async register(@Body() u: CreateUserDto) {
    return this.service.register(u);
  }

  @ApiOperation({
    description: 'Authorize via email and password',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        access: {
          type: 'string',
          description: 'Access token, lifetime 3 minutes',
        },
        refresh: {
          type: 'string',
          description: 'Refresh token, lifetime 3 days',
        },
      },
    },
  })
  @Post('login')
  public async login(@Body() u: CreateUserDto) {
    return this.service.login(u.email, u.password);
  }

  @ApiOperation({
    description: 'Refresh token',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        access: {
          type: 'string',
          description: 'Access token, lifetime 3 minutes',
        },
        refresh: {
          type: 'string',
          description: 'Refresh token, lifetime 3 days',
        },
      },
    },
  })
  @Get('refresh')
  public async refresh(@Query('token') token: string) {
    return this.service.updateRefToken(token);
  }
}
