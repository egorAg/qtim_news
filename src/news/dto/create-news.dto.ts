import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'News headline',
    example: 'This is example ews headline',
    type: 'string',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'News body',
    example: 'lorem100',
    type: 'string',
    required: true,
  })
  description: string;

  authorId?: number;
}
