import { PostsState } from './posts.feature';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPostsFeature = createFeatureSelector<PostsState>('posts');

export const selectPosts = (userId: number) =>
  createSelector(selectPostsFeature, (state: PostsState) => state.userPosts[userId]?.posts ?? []);

export const selectPostsLoadingIndicator = createSelector(
  selectPostsFeature,
  (state: PostsState) => state.isLoading,
);
/*export const selectPostsErrors = createSelector(
  selectPostsFeature,
  (state: PostsState) => state.error,
);*/
