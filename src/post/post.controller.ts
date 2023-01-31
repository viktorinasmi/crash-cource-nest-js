//Контроллер нужен для того, чтобы принимать данные обрабатывать и отдавать сервису

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll();
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  //Получение постов по id
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  //Обновление поста
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }

  //Удаление поста
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
