import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageUrlPipe } from '../../../shared/pipes/image-url.pipe';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'tt-siderbar',
  imports: [RouterLink, RouterLinkActive, ImageUrlPipe, FastSvgComponent],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiderbarComponent {
  private readonly profileService = inject(ProfileService);

  protected readonly subscribers$ = toSignal(this.profileService.getSubscribersShortList());
  protected readonly me$ = toSignal(this.profileService.getMe());

  protected readonly menuItems = [
    {
      link: '/profile/me',
      label: 'Моя страница',
      icon: 'home',
    },
    {
      link: '/chats',
      label: 'Чаты',
      icon: 'chat',
    },
    {
      link: '/',
      label: 'Поиск',
      icon: 'search',
    },
  ];
}
