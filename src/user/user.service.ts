import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async getByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async create(user: CreateUserDto) {
    const candidate = await this.getByEmail(user.email);

    if (candidate) {
      throw new HttpException(
        `User with email: ${user.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.usersRepository.create(user);

    await this.usersRepository.save(user);

    return newUser;
  }

  public async updateRefreshToken(id: number, token: string) {
    const candidate = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!candidate) {
      throw new HttpException(
        `Cant find user with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    candidate.refToken = token;

    await this.usersRepository.save(candidate);
  }
}
