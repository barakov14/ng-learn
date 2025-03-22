import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './profile.actions';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { selectProfile, selectProfilePageable } from './profile.selectors';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {
  readonly #profileService = inject(ProfileService);
  readonly #actions$ = inject(Actions);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  fetchGetAccounts$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchGetAccounts, profileActions.profileAccountsPageChange),
      concatLatestFrom(() => this.#store.select(selectProfilePageable)),
      switchMap(([action, pageable]) => {
        const filters = 'filters' in action ? action.filters : {};
        return this.#profileService.getAccounts(filters, pageable).pipe(
          map((profiles) =>
            profileActions.getAccountsSuccess({
              accounts: profiles,
              merge: !('filters' in action),
            }),
          ),
          catchError((error) =>
            of(profileActions.getAccountFailure({ error: error.error.errors })),
          ),
        );
      }),
    ),
  );

  fetchGetAccount$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchGetAccount),
      concatLatestFrom(({ id }) => this.#store.select(selectProfile(id))),
      switchMap(([{ id }, profile]) =>
        profile ? of(profile) : this.#profileService.getAccount(id),
      ),
      map((profile) => profileActions.getAccountSuccess({ profile })),
      catchError((error) => of(profileActions.getAccountFailure({ error }))),
    ),
  );

  fetchGetSubscribersShortList$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchGetSubscribersShortList),
      switchMap(({ subsAmount }) =>
        this.#profileService.getSubscribersShortList(subsAmount).pipe(
          map((subscribers) => profileActions.getSubscribersShortListSuccess({ subscribers })),
          catchError((error) =>
            of(profileActions.getSubscribersShortListFailure({ error: error.error.errors })),
          ),
        ),
      ),
    ),
  );

  fetchPatchProfile$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchPatchProfile),
      switchMap(({ data }) =>
        this.#profileService.patchProfile(data).pipe(
          map(() => profileActions.patchProfileSuccess({ data })),
          catchError((error) =>
            of(profileActions.patchProfileFailure({ error: error.error.errors })),
          ),
        ),
      ),
    ),
  );

  fetchUploadAvatar$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchUploadAvatar),
      switchMap(({ imageUrl }) =>
        this.#profileService.uploadAvatar(imageUrl).pipe(
          map(({ avatarUrl }) => profileActions.uploadAvatarSuccess({ avatarUrl })),
          catchError((error) =>
            of(profileActions.uploadAvatarFailure({ error: error.error.errors })),
          ),
        ),
      ),
    ),
  );

  fetchCreateChat$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(profileActions.fetchCreateChat),
      switchMap(({ userId }) =>
        this.#profileService.createChat(userId).pipe(
          map(() => profileActions.createChatSuccess()),
          tap(() => this.#router.navigate(['/chats'])),
          catchError((error) =>
            of(profileActions.createChatFailure({ error: error.error.errors })),
          ),
        ),
      ),
    ),
  );
}
