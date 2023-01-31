//В сервисах лежит вся логика

import { Body, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  //Получение всех постов
  async getAll() {
    return this.postRepository.find();
  }

  //Создание постов
  async create(dto: CreatePostDto) {
    const post = this.postRepository.create(dto);
    return this.postRepository.save(post);
  }

  //Получение конкретного поста по id
  async getById(id: string) {
    return this.postRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  //Обновление контретного поста по id
  async update(id: string, @Body() dto: UpdatePostDto) {
    const post = await this.getById(id);
    post.content = dto.content;
    post.userName = dto.userName;
    return this.postRepository.save(post);
  }

  //Удаление конкретного поста по id
  async delete(id: string) {
    return this.postRepository.delete({ id: Number(id) });
  }
}
