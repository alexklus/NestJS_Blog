import { Post } from 'src/post/post.entity';
import { BaseEntity } from 'typeorm';

export class Comment extends BaseEntity {
  id: number;
  content: string;
  post: Post;
}
