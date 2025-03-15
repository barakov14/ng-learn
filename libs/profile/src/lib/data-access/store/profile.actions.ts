import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pageble, Profile } from '@tt/common';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    fetchGetAccounts: props<{
      filters: Partial<{
        firstName: string | null;
        lastName: string | null;
        stack: string | null;
      }>;
    }>(),
    getAccountsSuccess: props<{ accounts: Pageble<Profile> }>(),
    getAccountsFailure: props<{ error: string }>(),

    fetchGetMe: emptyProps(),
    getMeSuccess: props<{ profile: Profile }>(),
    getMeFailure: props<{ error: string }>(),

    fetchGetSubscribersShortList: props<{ subsAmount?: number }>(),
    getSubscribersShortListSuccess: props<{ subscribers: Profile[] }>(),
    getSubscribersShortListFailure: props<{ error: string }>(),

    fetchGetAccount: props<{ id: number }>(),
    getAccountSuccess: props<{ profile: Profile }>(),
    getAccountFailure: props<{ error: string }>(),

    fetchPatchProfile: props<{ data: Partial<Profile> }>(),
    patchProfileSuccess: props<{ data: Partial<Profile> }>(),
    patchProfileFailure: props<{ error: string }>(),

    fetchUploadAvatar: props<{ imageUrl: File }>(),
    uploadAvatarSuccess: props<{ avatarUrl: string }>(),
    uploadAvatarFailure: props<{ error: string }>(),

    fetchCreateChat: props<{ userId: number }>(),
    createChatSuccess: emptyProps(),
    createChatFailure: props<{ error: string }>(),
  },
});
