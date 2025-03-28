import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { Profile } from '../../data-access/models/profile';
import { ImageUrlPipe } from '../../utils/pipes/image-url.pipe';

@Component({
  selector: 'tt-sidebar',
  imports: [RouterLink, RouterLinkActive, ImageUrlPipe, FastSvgComponent],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiderbarComponent {
  readonly currentUser = input.required<Profile>();
  readonly profiles = input.required<Profile[]>();
  readonly unreadMessagesCount = input<number>(0);

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
