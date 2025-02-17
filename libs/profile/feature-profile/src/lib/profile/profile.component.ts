import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileService } from '@tt/profile/data-access';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from '@tt/profile/ui';
import { ImageUrlPipe } from '@tt/common/utils';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostFeedComponent } from '@tt/posts/feature-posts';
import { AuthService } from '@tt/auth/data-access';

@Component({
  selector: 'tt-profile',
  imports: [ProfileHeaderComponent, RouterLink, ImageUrlPipe, FastSvgComponent, PostFeedComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly currentUser = inject(AuthService).currentUser;

  protected readonly subscribers$ = toSignal(this.profileService.getSubscribersShortList(5));

  protected readonly profile = toSignal(
    this.route.params.pipe(
      map((param): string => param['id']),
      switchMap((id) =>
        id === 'me' ? this.profileService.getMe() : this.profileService.getAccount(id),
      ),
    ),
  );

  async sendMessage(userId: number) {
    const res = await lastValueFrom(this.profileService.createChat(userId));
    this.router.navigate(['/chats', res.id]);
  }
}
