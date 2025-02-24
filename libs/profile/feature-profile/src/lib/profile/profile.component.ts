import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileService } from '@tt/profile/data-access';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from '@tt/profile/ui';
import { ImageUrlPipe } from '@tt/common/utils';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostFeedComponent } from '@tt/posts/feature-posts';
import { AuthService } from '@tt/auth/data-access';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectProfile, profileActions } from '@tt/profile/data-access';

@Component({
  selector: 'tt-profile',
  imports: [ProfileHeaderComponent, RouterLink, ImageUrlPipe, FastSvgComponent, PostFeedComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly #profileService = inject(ProfileService);
  readonly #route = inject(ActivatedRoute);
  readonly #store = inject(Store);
  protected readonly currentUser = this.#store.selectSignal(selectCurrentUser);

  protected readonly subscribers$ = toSignal(this.#profileService.getSubscribersShortList(5));

  protected readonly profile = toSignal(
    this.#route.params.pipe(
      map((param) => param['id']),
      tap((id) =>
        this.#store.dispatch(
          id === 'me'
            ? profileActions.fetchGetMe()
            : profileActions.fetchGetAccount({ id: Number(id) }),
        ),
      ),
      switchMap((id) =>
        this.#store.select(id === 'me' ? selectCurrentUser : selectProfile(Number(id))),
      ),
    ),
  );

  sendMessage(userId: number) {
    this.#store.dispatch(profileActions.fetchCreateChat({ userId }));
  }
}
