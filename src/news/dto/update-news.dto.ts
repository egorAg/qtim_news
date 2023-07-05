import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto {
  @ApiProperty({
    type: 'number',
    required: true,
    description: 'ID of record',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Title of record',
    required: false,
  })
  title?: string;

  @ApiProperty({
    type: 'string',
    description: 'Description of record',
    required: false,
  })
  description?: string;
}
