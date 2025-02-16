import { CommentCreateDto } from './lib/models/comment';
import { Author, Post, PostComment, PostsCreateDto } from './lib/models/posts';
import { PostsDataService } from './lib/services/posts-data.service';
import { PostsService } from './lib/services/posts.service';

export type { PostsCreateDto, Author, Post, PostComment, CommentCreateDto };

export { PostsService, PostsDataService };
