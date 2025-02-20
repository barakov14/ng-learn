import { createActionGroup, props } from '@ngrx/store';
import { CommentCreateDto, Post, PostComment, PostsCreateDto } from '@tt/posts/data-access';

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
