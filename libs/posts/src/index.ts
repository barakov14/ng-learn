import { PostsDataService } from './lib/data-access/services/posts-data.service';
import { PostsEffects } from './lib/data-access/store/posts.effects';
import { postsFeature } from './lib/data-access/store/posts.feature';
import { PostFeedComponent } from './lib/post-feed/post-feed.component';
import { PostComponent } from './lib/post/post.component';

export { PostFeedComponent, PostComponent, PostsDataService, PostsEffects, postsFeature };
