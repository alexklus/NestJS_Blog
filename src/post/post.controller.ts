import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  addPost(@GetUser() user: User, @Body(ValidationPipe) postDto: PostDto) {
    return this.postService.addPost(user, postDto);
  }

  @Get('/:id')
  getTopicById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }
}
