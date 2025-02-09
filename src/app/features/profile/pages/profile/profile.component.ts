import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { PostFeedComponent } from '../../components/posts/post-feed/post-feed.component';
import { ChatsService } from '../../../chats/services/chats.service';
import { ChatsDataService } from '../../../chats/services/chats-data.service';
import {
  CurrentUserMakeVisibleDirective,
  UserMakeNotVisibleDirective,
} from '../../../../shared/directives/is-current-user.directive';

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

  subscribers$ = toSignal(this.profileService.getSubscribersShortList(5));

  profile = toSignal(
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
