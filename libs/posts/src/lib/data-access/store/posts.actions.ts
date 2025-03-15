import { createActionGroup, props } from '@ngrx/store';
import { CommentCreateDto } from '../models/comment';
import { Post, PostComment, PostsCreateDto } from '../models/posts';

export const postsActions = createActionGroup({
  source: 'Posts',
  events: {
    requestCreatePost: props<{ payload: PostsCreateDto }>(),
    createPostSuccess: props<{ post: Post }>(),
    createPostFailure: props<{ error: string }>(),

    requestFetchPosts: props<{ userId: number }>(),
    fetchPostsSuccess: props<{ posts: Post[] }>(),
    fetchPostsFailure: props<{ error: string }>(),

    requestCreateComment: props<{ payload: CommentCreateDto }>(),
    createCommentSuccess: props<{ comment: PostComment }>(),
    createCommentFailure: props<{ error: string }>(),
  },
});
