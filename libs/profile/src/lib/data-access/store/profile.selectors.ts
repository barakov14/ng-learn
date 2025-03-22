import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.feature';

export const selectProfileFeature = createFeatureSelector<ProfileState>('profile');

export const selectProfile = (userId: number) =>
  createSelector(selectProfileFeature, (state: ProfileState) => state.profile[userId]);

export const selectProfiles = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.profiles,
);

export const selectProfileFilters = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.filters,
);

export const selectProfileIsLoading = createSelector(
  selectProfileFeature,
  (state: ProfileState) => state.isLoading,
);

export const selectProfilePageable = createSelector(
  selectProfileFeature,
  (state: ProfileState) => ({
    page: state.page,
    size: state.size,
  }),
);
