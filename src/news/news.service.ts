import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './models/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}
  public async create(p: CreateNewsDto) {
    try {
      const newNews = this.newsRepo.create({
        title: p.title,
        description: p.description,
        author: {
          id: p.authorId,
        },
      });

      return this.newsRepo.save(newNews);
    } catch (e) {
      throw new HttpException(`Unexpected error`, HttpStatus.I_AM_A_TEAPOT);
    }
  }

  public async read() {
    return this.newsRepo.find({
      order: {
        id: 'DESC',
      },
    });
  }

  public async update(p: UpdateNewsDto) {
    const candidate = await this.getById(p.id);

    if (!candidate) {
      throw new HttpException(
        `Can't find record with id: ${p.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.newsRepo.save({
      id: p.id,
      title: p.title ?? candidate.title,
      description: p.description ?? candidate.description,
    });
  }

  public async delete(id: number) {
    const candidate = await this.getById(id);

    if (candidate) {
      await this.newsRepo.remove(candidate);
    }

    return true;
  }

  private async getById(id: number) {
    const candidate = this.newsRepo.findOne({
      where: {
        id,
      },
    });

    if (!candidate) {
      return;
    } else {
      return candidate;
    }
  }
}
