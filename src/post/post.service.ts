import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new NotFoundException(`Post with id ${id} not found!`);
    } else {
      return post;
    }
  }

  async updatePostById(
    id: number,
    postBody: string,
    user: User,
  ): Promise<Post> {
    const post = await this.getPostById(id);

    if (!this.validateAuthor(post.user, user)) {
      throw new UnauthorizedException('Unable to update post!');
    } else {
      post.body = postBody;
      await post.save();
      return post;
    }
  }
  async deletePostById(id: number, user: User): Promise<void> {
    const post = await this.getPostById(id);

    if (!this.validateAuthor(post.user, user)) {
      throw new UnauthorizedException('delete to update post!');
    } else {
      await this.postRepository.remove(post);
    }
  }

  private validateAuthor(postAuthor: User, authenticatedUser: User): boolean {
    return (
      postAuthor &&
      authenticatedUser &&
      postAuthor.id === authenticatedUser.id &&
      postAuthor.username === authenticatedUser.username
    );
  }
}
