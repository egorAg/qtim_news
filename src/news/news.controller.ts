import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { NewsService } from './news.service';
import { User } from '../decorators/getUser.decorator';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsSchema, NewsSchemaArray } from './schema/news.schema';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @ApiOperation({
    description: 'Create new news record',
  })
  @ApiOkResponse({
    status: 201,
    schema: NewsSchema,
  })
  @Post()
  @Auth()
  public async create(@Body() p: CreateNewsDto, @User() id: number) {
    return this.service.create({ ...p, authorId: id });
  }

  @ApiOperation({
    description: 'Get all news',
  })
  @ApiOkResponse({
    status: 200,
    schema: NewsSchemaArray,
  })
  @Get()
  public async getAll() {
    return this.service.read();
  }

  @ApiOperation({
    description: 'Update news',
  })
  @ApiOkResponse({
    status: 200,
    schema: NewsSchema,
  })
  @Patch()
  @Auth()
  public async update(@Body() p: UpdateNewsDto) {
    return this.service.update(p);
  }

  @ApiOperation({
    description: 'Remove news record',
  })
  @ApiOkResponse({
    status: 200,
  })
  @Delete()
  @Auth()
  public async del(@Query('id') id: number) {
    if (!id) {
      throw new HttpException(`ID not provided`, HttpStatus.BAD_REQUEST);
    }
    await this.service.delete(id);
  }
}
