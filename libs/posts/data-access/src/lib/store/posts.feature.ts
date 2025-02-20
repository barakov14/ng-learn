import { Post } from '@tt/posts/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postsActions } from './posts.actions';

export type PostsState = {
  userPosts: Record<number, { posts: Post[] }>;
  isLoading: boolean;
  error: string | null;
  currentUserId: number;
};

export const postsInitialState: PostsState = {
  userPosts: {},
  currentUserId: 0,
  isLoading: false,
  error: null,
};

export const postsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    postsInitialState,

    on(postsActions.requestFetchPosts, (state, { userId }) => ({
      ...state,
      currentUserId: userId,
      isLoading: true,
      error: null,
    })),

    on(postsActions.fetchPostsSuccess, (state, { posts }) => ({
      ...state,
      isLoading: false,
      userPosts: {
        ...state.userPosts,
        [state.currentUserId]: {
          posts: [...(state.userPosts[state.currentUserId]?.posts || []), ...posts],
        },
      },
    })),

    on(postsActions.fetchPostsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(postsActions.requestCreatePost, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(postsActions.createPostSuccess, (state, { post }) => ({
      ...state,
      isLoading: false,
      userPosts: {
        ...state.userPosts,
        [post.author.id]: {
          posts: [post, ...state.userPosts[post.author.id].posts],
        },
      },
    })),

    on(postsActions.createPostFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(postsActions.requestCreateComment, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(postsActions.createCommentSuccess, (state, { comment }) => ({
      ...state,
      isLoading: false,
      userPosts: {
        ...state.userPosts,
        [state.currentUserId]: {
          posts: state.userPosts[state.currentUserId]?.posts.map((post) => ({
            ...post,
            comments: [comment, ...post.comments],
          })),
        },
      },
    })),

    on(postsActions.createCommentFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
