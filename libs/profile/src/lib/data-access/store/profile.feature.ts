import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './profile.actions';
import { Pageble, Profile } from '@tt/common';

export type ProfileState = {
  profiles: Pageble<Profile> | null;
  profile: Record<number, Profile>;
  currentUser: Profile | null;
  subscribers: Profile[];
  filters: Partial<{
    firstName: string | null;
    lastName: string | null;
    stack: string | null;
  }>;
  isLoading: boolean;
  error: string | null;
};

export const profileInitialState: ProfileState = {
  profiles: null,
  profile: {},
  currentUser: null,
  subscribers: [],
  filters: {},
  isLoading: false,
  error: null,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(profileActions.fetchGetAccounts, (state, { filters }) => ({
      ...state,
      isLoading: true,
      error: null,
      filters,
    })),
    on(profileActions.getAccountsSuccess, (state, { accounts }) => ({
      ...state,
      isLoading: false,
      error: null,
      profiles: accounts,
    })),
    on(profileActions.getAccountFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(profileActions.fetchGetMe, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(profileActions.getMeSuccess, (state, { profile }) => ({
      ...state,
      isLoading: false,
      error: null,
      currentUser: profile,
    })),
    on(profileActions.getMeFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(profileActions.fetchGetAccount, (state, { id }) => ({
      ...state,
      isLoading: true,
      userId: id,
      error: null,
    })),
    on(profileActions.getAccountSuccess, (state, { profile }) => ({
      ...state,
      isLoading: false,
      profile: {
        ...state.profile,
        [profile.id]: profile,
      },
      error: null,
    })),
    on(profileActions.getAccountFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(profileActions.fetchGetAccount, (state, { id }) => ({
      ...state,
      isLoading: true,
      userId: id,
      error: null,
    })),

    on(profileActions.fetchGetSubscribersShortList, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(profileActions.getSubscribersShortListSuccess, (state, { subscribers }) => ({
      ...state,
      subscribers,
      isLoading: false,
      error: null,
    })),
    on(profileActions.getSubscribersShortListFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(profileActions.fetchPatchProfile, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(profileActions.patchProfileSuccess, (state, { data }) => ({
      ...state,
      isLoading: false,
      currentUser: state.currentUser ? { ...state.currentUser, ...data } : null,
      error: null,
    })),
    on(profileActions.patchProfileFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),

    on(profileActions.fetchUploadAvatar, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(profileActions.uploadAvatarSuccess, (state, { avatarUrl }) => ({
      ...state,
      currentUser: state.currentUser ? { ...state.currentUser, avatarUrl } : null,
      isLoading: false,
      error: null,
    })),

    on(profileActions.uploadAvatarFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
