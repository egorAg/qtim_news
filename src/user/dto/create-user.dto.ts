import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Email to register',
    example: 'test@mail.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
    example: 'qweQWE123!',
  })
  password: string;
}
