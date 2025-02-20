import { CommentCreateDto } from './lib/models/comment';
import { Author, Post, PostComment, PostsCreateDto } from './lib/models/posts';
import { PostsDataService } from './lib/services/posts-data.service';
import { PostsService } from './lib/services/posts.service';
import { PostsEffects } from './lib/store/posts.effects';
import { postsActions } from './lib/store/posts.actions';
import { postsFeature } from './lib/store/posts.feature';

export type { PostsCreateDto, Author, Post, PostComment, CommentCreateDto };

export { PostsService, PostsDataService };
export { PostsEffects, postsActions, postsFeature };
