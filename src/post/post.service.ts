import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformPlainToClass } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}

  async getAllPosts(): Promise<Array<Post>> {
    return await this.postRepository.find();
  }

  async addPost(user: User, postDto: PostDto): Promise<Post> {
    const { title, body } = postDto;

    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = user;

    await post.save();

    return post;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Topic with id ${id} not found!`);
    } else {
      return post;
    }
  }
}
