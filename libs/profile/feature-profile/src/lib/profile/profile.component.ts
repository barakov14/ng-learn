import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileService } from '@tt/profile/data-access';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from '@tt/profile/ui';
import { ImageUrlPipe } from '@tt/common/utils';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostFeedComponent } from '@tt/posts/feature-posts';
import { ChatsService } from '@tt/chats/data-access';
import { ChatsDataService } from '../../../../../chats/data-access/src/lib/services/chats-data.service';
import { CurrentUserMakeVisibleDirective, UserMakeNotVisibleDirective } from '@tt/common/utils';

@Component({
  selector: 'tt-profile',
  imports: [
    ProfileHeaderComponent,
    RouterLink,
    ImageUrlPipe,
    FastSvgComponent,
    PostFeedComponent,
    CurrentUserMakeVisibleDirective,
    UserMakeNotVisibleDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatsDataService, ChatsService],
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);
  private readonly chatsService = inject(ChatsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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
    const res = await lastValueFrom(this.chatsService.createChat(userId));
    this.router.navigate(['/chats', res.id]);
  }
}
